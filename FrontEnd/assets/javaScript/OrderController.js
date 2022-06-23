var orderUrl = "http://localhost:8080/Spring/api/v1/order";
var customer;

generateOrderId();
loadAllCustomerIds();
loadAllItemIds();
getOrderCount();
loadAllOrderTable();

tempDB = [];

//Set current date
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
$('#txtOrderDate').val(today);

//START ORDER BTN FUNCTION
$("#btnAddItem").click(function () {
    let itemID = $("#cmbItemId").val();
    let name = $("#txtOrderItemName").val();
    var price = $("#txtOrderItemPrice").val();
    var qtyOnHand = $("#txtOrderQtyOnHand").val();
    var qty = $("#txtOrderQty").val();
    var itemTotal = price * qty;

    let previousItemTotal = $("#txtTotal").val();
    var total = (+itemTotal) + (+previousItemTotal);


    let item = checkItemExist(itemID);
    if (item) {
        if ((+item.qty) + (+qty) <= qtyOnHand) {
            item.qty = (+item.qty) + (+qty);
            item.total = (+item.total) + (+itemTotal);

            $("#txtTotal").val(total.toFixed(2));

        } else {
            alert("Numbers of order quantity are exceed the limit");
        }

    } else {
        if (+qty <= qtyOnHand) {
            var tempObj = {
                itemId: itemID,
                name: name,
                price: price,
                qty: +qty,
                total: itemTotal
            }
            tempDB.push(tempObj);
            $("#txtTotal").val(total.toFixed(2));
        } else {
            alert("Numbers of order quantity are exceed the limit");
        }
    }
    loadCart();
    $("#txtDiscount").prop('disabled', false);


});

$("#btnPlaceOrder").click(function () {
    placeOrder();
    clearAllDetails();


});

$("#btnDeleteOrder").click(function () {
    let res = confirm("Do you really need to delete this order ?");
    if (res) {
        deleteOrder();
    }
});

$("#btnOrderSearch").click(function () {
    searchOrder();
});
//END ORDER BTN FUNCTION

//START ORDER CRUD OPERATIONS
function loadAllCustomerIds() {
    $("#cmbCustomerId").empty();
    $.ajax({
        url: customerUrl + "/getAllIds",
        method: "GET",
        success: function (resp) {
            for (var customerId of resp.data) {
                let id = `<option>${customerId}</option>`
                $("#cmbCustomerId").append(id);
            }
        }
    });

}

function loadAllItemIds() {
    $("#cmbItemId").empty();

    $.ajax({
        url: itemUrl + "/getAllIds",
        method: "GET",
        success: function (resp) {
            for (var itemId of resp.data) {
                let code = `<option>${itemId}</option>`
                $("#cmbItemId").append(code);
            }
        }
    });
}

function generateOrderId() {
    $.ajax({
        url: orderUrl + "/generateId",
        method: "GET",
        success: function (resp) {
            $("#txtOrderId").val(resp.data);
        }
    })

}

function loadCart() {
    $("#addItemTable").empty();

    for (var i of tempDB) {
        let row = `<tr><td>${i.itemId}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.total.toFixed(2)}</td></tr>`;
        $("#addItemTable").append(row);
    }
}

function checkItemExist(id) {
    for (var i = 0; i < tempDB.length; i++) {
        if (tempDB[i].itemId == id) {
            return tempDB[i];
        }
    }
}

function placeOrder() {
    let orderId = $("#txtOrderId").val();
    let cusId = $("#cmbCustomerId").val();
    let date = $("#txtOrderDate").val();
    let total = $("#txtSubTotal").val();
    let discount = $("#txtDiscount").val();

    cart = [];
    for (var obj of tempDB) {
        var cartObj = {
            orderId: orderId,
            itemCode: obj.itemId,
            qty: obj.qty,
            price: obj.price
        }
        cart.push(cartObj);
    }


    let orderObj = {
        orderId: orderId,
        date: date,
        customer: customer,
        cost: total,
        discount: discount,
        orderDetail: cart
    }

    $.ajax({
        url: orderUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderObj),
        success: function (res) {
            if (res.status == 200) {
                alert("Order Placed Successfully");
                generateOrderId();
                getOrderCount();
                loadAllOrderTable();
                loadAllItem();
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });


}

function clearAllDetails() {
    $("#txtOrderCustomerName,#txtOrderSalary,#txtOrderAddress,#txtOrderItemName,#txtOrderItemPrice,#txtOrderQtyOnHand,#txtOrderQty,#txtTotal,#txtSubTotal,#txtCash,#txtDiscount,#txtBalance").val("");
    $("#btnAddItem,#btnPlaceOrder").prop('disabled', true);
    $("#txtDiscount,#txtCash").prop('disabled', true);
    tempDB.splice(0, tempDB.length);
    $("#addItemTable").empty()
}

function loadAllOrderTable() {
    $("#allOrderTable").empty();

    $.ajax({
        url: orderUrl + "/getAll",
        method: "GET",
        success: function (resp) {
            for (const order of resp.data) {
                let row = `<tr><td>${order.orderId}</td><td>${order.date}</td><td>${order.customer.customerId}</td><td>${order.discount}</td><td>${order.cost.toFixed(2)}</td></tr>`;
                $("#allOrderTable").append(row);
            }
        }
    });
}

function searchOrder() {
    var searchID = $("#txtOrderSearch").val();
    $.ajax({
        url: orderUrl + "/" + searchID,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                var o = res.data;
                $("#homeOrderId").val(o.orderId);
                $("#homeOrderDate").val(o.date);
                $("#homeDiscount").val(o.discount);
                $("#homeCost").val(o.cost.toFixed(2));
                $("#homeCustomerName").val(o.customer.customerId);
                $("#btnDeleteOrder").prop('disabled', false);
            } else {
                alert("No Order For"+searchID);
                clearAllOrderDetails();
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

function clearAllOrderDetails() {
    $('#txtOrderSearch,#homeOrderId,#homeOrderDate,#homeCustomerName,#homeDiscount,#homeCost').val("");
    $("#btnDeleteOrder").prop('disabled', true);

}

function deleteOrder() {

    var orderId = $("#homeOrderId").val();
    $.ajax({
        url: orderUrl + "/" + orderId,
        method: "DELETE",
        success: function (res) {
            alert("Order Deleted Successfully");
            loadAllOrderTable();
            clearAllOrderDetails();
            getOrderCount();
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

function getOrderCount() {
    $.ajax({
        url: orderUrl + "/count",
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#txtOrderCount").text(res.data);
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

//END ORDER CRUD OPERATIONS


//START ORDER KEY FUNCTION
function activeAddItemBtn() {
    if ($("#txtOrderItemName").val().length !== 0 && $("#txtOrderQty").val().length !== 0) {
        $("#btnAddItem").prop('disabled', false);
    }
}

function activePurchaseBtn() {
    if ($("#txtOrderCustomerName").val().length !== 0 && $("#txtBalance").val().length !== 0 && tempDB.length !== 0) {
        $("#btnPlaceOrder").prop('disabled', false);
    } else {
        $("#btnPlaceOrder").prop('disabled', true);
    }
}

$("#txtOrderQty").keyup(function () {
    if ($("#txtOrderQty").val() > 0) {
        activeAddItemBtn();
    } else {
        $("#btnAddItem").prop('disabled', true);
    }
});

$("#txtOrderDate").keyup(function () {
    activePurchaseBtn();
});

$("#txtCash").keyup(function (event) {
    if (event.key == "Enter") {
        if ($("#txtCash").val().length !== 0) {
            var cash = $("#txtCash").val();
            var subTotal = $("#txtSubTotal").val();

            var balance = (+cash) - (+subTotal);
            $("#txtBalance").val(balance.toFixed(2));

            activePurchaseBtn();
        }
    }
});

$("#txtDiscount").keyup(function (event) {
    if (event.key == "Enter") {
        if ($("#txtDiscount").val().length !== 0) {
            var total = $("#txtTotal").val();
            var discount = $("#txtDiscount").val();

            var subTotal = total - (total * (discount / 100));
            $("#txtSubTotal").val(subTotal.toFixed(2));
            $("#txtCash").prop('disabled', false);
            $("#btnAddItem").prop('disabled', true);

        }
    }
});

$("#txtBalance").keyup(function () {
    activePurchaseBtn();
});

$("#cmbCustomerId").click(function () {
    var customerId = $("#cmbCustomerId").val();

    $.ajax({
        url: customerUrl + "/" + customerId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                customer = res.data;
                $("#txtOrderCustomerName").val(customer.customerName);
                $("#txtOrderSalary").val(customer.customerSalary.toFixed(2));
                $("#txtOrderAddress").val(customer.customerAddress);
            }
            activePurchaseBtn();
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
});

$("#cmbItemId").click(function () {
    var itemId = $("#cmbItemId").val();

    $.ajax({
        url: itemUrl + "/" + itemId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                var i = res.data;
                $("#txtOrderItemName").val(i.itemName);
                $("#txtOrderItemPrice").val(i.itemPrice.toFixed(2));
                $("#txtOrderQtyOnHand").val(i.itemQty);
            }
            activeAddItemBtn();
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
});

//END ORDER KEY FUNCTION








