const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');


router.get('/', (req, res) => {
    res.render("home", {
        viewT:" Home  "
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

router.get('/order', (req, res) => {
    res.render("addOrEditOrder", {
       viewTit: "Insert Order"
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
    department : req.body.department,
    startingDate : req.body.startingDate,
    grade : req.body.grade,
    salary : req.body.salary,
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
     color: req.body.color,
     gender: req.body.gender,
     price : req.body.price,
     quantity : req.body.quantity,
     size : req.body.size,

 });
 
 await product.save();
 return res.redirect('/home/product');
    }
 
 });

 router.post('/order', async(req, res) => {
    let order = await Order.findOne({ orderID: req.body.orderID });
    if (order) { 
     return res.redirect("/home/order");
    }
    else {
      order = new Order({
     orderID : req.body.orderID,
     totalPrice : req.body.totalPrice,
     costumerName : req.body.costumerName,
     address : req.body.address,
     phone : req.body.phone,
   
 });
 
 await order.save();
 return res.redirect('/home/order');
    }
 
 });
 


router.get('/list', (req, res) => {
    Employee.find() 
    .then((docs) =>{
    
            res.render('list', {
                view: "Employee list",
                list: docs
            });
        
        
    }).catch(err => console.log('Error in retriving employees list'));

});

router.get('/productList', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("productList", {
                vie:"Product list",
                list: docs
            });
        }
        else {
            console.log('Error in retrieving products list :' + err);
        }
    });
});

router.get('/orderList', (req, res) => {
    Order.find((err, docs) => {
        if (!err) {
            res.render("orderList", {
                vi:"Order list",
                list: docs
            });
        }
        else {
            console.log('Error in retrieving orders list :' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Employee.findOne({ _id: req.params.id })
    .then(employee =>{
        if(employee){
            res.render("updateEmployee", {
                viewTitle: "Update Employee",
                employee: employee
            });
        }
    });
});

router.get('/:id', (req, res) => {
    Product.findOne({ _id: req.params.id })
    .then(product =>{
        if(product){
            res.render("update product", {
                viewTi: "Update product",
                product: product
            });
        }
    });
});



router.post('/update', async (req, res) => {
    await Employee.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            fullName: req.body.fullName,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
            department: req.body.department,
            startingDate: req.body.startingDate,
            grade: req.body.grade,
            salary: req.body.salary,
        }
    });
    res.redirect("/employee/list");
})


router.post('/update', async (req, res) => {
    await Product.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            productID : req.body.productID,
            item : req.body.item,
            color: req.body.color,
            gender: req.body.gender,
            price : req.body.price,
            quantity : req.body.quantity,
            size : req.body.size,
        }
    });
    res.redirect("/product/productList");
})

router.post('/update', async (req, res) => {
    await Employee.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
                orderID : req.body.orderID,
                totalPrice : req.body.totalPrice,
                costumerName : req.body.costumerName,
                address : req.body.address,
                phone : req.body.phone,
        }
    });
    res.redirect("/order/orderList");
})


router.get('/delete/:id', async(req, res) => {
    let employee = await  Employee.findByIdAndRemove({ _id: req.params.id }) ; 
          return res.redirect('/employee/list');
  });

  router.get('/deleteProduct/:id', async(req, res) => {
    let product = await  Product.findByIdAndRemove({ _id: req.params.id }) ; 
          return res.redirect('/product/productList');
  });

  router.get('/deleteOrder/:id', async(req, res) => {
    let order = await  Order.findByIdAndRemove({ _id: req.params.id }) ; 
          return res.redirect('/order/orderList');
  });




module.exports = router;


