const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Product = mongoose.model('Product');


router.get('/', (req, res) => {
    res.render("home", {
        viewT:"Manage employees/products"
    });
});


router.get('/employee', (req, res) => {
    res.render("addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.get('/product', (req, res) => {
    res.render("addOrEditProduct", {
       viewTi: "Insert Product"
    });
});



router.post('/employee', async(req, res) => {
   let employee = await Employee.findOne({ email: req.body.email });
   if (employee) { 
    return res.redirect("/home/employee");
   }
   else {
    employee = new Employee({
    fullName : req.body.fullName,
    email : req.body.email,
    mobile : req.body.mobile,
    city : req.body.city,
});
await employee.save();
return res.redirect('/home/employee');
   }

});

router.post('/product', async(req, res) => {
    let product = await Product.findOne({ productID: req.body.productID });
    if (product) { 
     return res.redirect("/home/product");
    }
    else {
      product = new Product({
     productID : req.body.productID,
     item : req.body.item,
     price : req.body.price,
     quantity : req.body.quantity,
     size : req.body.size,

 });
 
 await product.save();
 return res.redirect('/home/product');
    }
 
 });
 


router.get('/list', (req, res) => {
    Employee.find() 
    .then((docs) =>{
    
            res.render('list', {
                list: docs
            });
        
        
    }).catch(err => console.log('Error in retriving employee list'));
});

router.get('/productList', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("productList", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});
function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("home/employee", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}





router.get('/delete/:id', async(req, res) => {
  let employee = await  Employee.findByIdAndRemove({id:req.body._id}) ; 
        await employee.save;
        return res.redirect('/home/list');
});

module.exports = router;


