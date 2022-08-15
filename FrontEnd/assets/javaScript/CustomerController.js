var customerUrl = "http://localhost:8080/Spring/api/v1/customer";

loadAllCustomer();
getCustomerCount();


//START CUSTOMER VALIDATION
var regExCusID = /^(C00-)[0-9]{3,4}$/;
var regExCusName = /^[A-z\s+]{5,50}$/;
var regExCusAddress = /^[A-z\s+]{5,50}$/;
var regExCusSalary = /^[0-9]*([.][0-9]{2})$/;

//START NEW CUSTOMER VALIDATION
function checkNewCustomerValidation() {
    let inputCusId = $("#txtCusId").val();
    let inputCusName = $("#txtCusName").val();
    let inputCusAddress = $("#txtCusAddress").val();
    let inputCusSalary = $("#txtCusSalary").val();

    if (regExCusID.test(inputCusId)) {
        if (regExCusName.test(inputCusName)) {
            if (regExCusAddress.test(inputCusAddress)) {
                if (regExCusSalary.test(inputCusSalary)) {
                    $("#btnCustomerSave").prop('disabled', false);
                }
            }
        }
    }
}

$("#txtCusId").keyup(function () {
    let inputCusId = $("#txtCusId").val();
    if (regExCusID.test(inputCusId)) {
        $("#txtCusId").css('border', '2px solid blue');
        $("#lblCusId").text("");

        checkNewCustomerValidation()
        $("#txtCusId").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtCusName").focus();
            }
        });
    } else {
        $("#txtCusId").css('border', '2px solid red');
        $("#lblCusId").text("Cus ID is a required field : Pattern C00-000");
        $("#btnCustomerSave").prop('disabled', true);

    }
});

$("#txtCusName").keyup(function () {
    let inputCusName = $("#txtCusName").val();
    if (regExCusName.test(inputCusName)) {
        $("#txtCusName").css('border', '2px solid blue');
        $("#lblCusName").text("");

        checkNewCustomerValidation()
        $("#txtCusName").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtCusAddress").focus();
            }
        });

    } else {
        $("#txtCusName").css('border', '2px solid red');
        $("#lblCusName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");

        $("#btnCustomerSave").prop('disabled', true);

    }
});

$("#txtCusAddress").keyup(function () {
    let inputCusAddress = $("#txtCusAddress").val();
    if (regExCusAddress.test(inputCusAddress)) {
        $("#txtCusAddress").css('border', '2px solid blue');
        $("#lblCusAddress").text("");

        checkNewCustomerValidation()
        $("#txtCusAddress").keydown(function (event) {
            if (event.key == "Enter") {
                $("#txtCusSalary").focus();
            }
        });

    } else {
        $("#txtCusAddress").css('border', '2px solid red');
        $("#lblCusAddress").text("Cus Address is a required field : Mimum 5");

        $("#btnCustomerSave").prop('disabled', true);

    }
});

$("#txtCusSalary").keyup(function () {
    let inputCusSalary = $("#txtCusSalary").val();
    if (regExCusSalary.test(inputCusSalary)) {
        $("#txtCusSalary").css('border', '2px solid blue');
        $("#lblCusSalary").text("");

        checkNewCustomerValidation()
        $("#txtCusSalary").keydown(function (event) {
            if (event.key == "Enter") {
                $("#btnCustomerSave").focus();
            }
        });
    } else {
        $("#txtCusSalary").css('border', '2px solid red');
        $("#lblCusSalary").text("Cus Salary is a required field : Pattern 100.00");

        $("#btnCustomerSave").prop('disabled', true);
    }
});
//END NEW CUSTOMER VALIDATION

//START UPDATE CUSTOMER VALIDATION
function checkUpdateCustomerValidation() {
    let inputCusName = $("#customerName").val();
    let inputCusAddress = $("#customerAddress").val();
    let inputCusSalary = $("#customerSalary").val();

    if (regExCusName.test(inputCusName)) {
        if (regExCusAddress.test(inputCusAddress)) {
            if (regExCusSalary.test(inputCusSalary)) {
                $("#btnCustomerUpdate").prop('disabled', false);
            }
        }
    }
}

$("#customerName").keyup(function () {
    let inputCusName = $("#customerName").val();
    if (regExCusName.test(inputCusName)) {
        $("#customerName").css('border', '2px solid blue');
        checkUpdateCustomerValidation()
        $("#customerName").keydown(function (event) {
            if (event.key == "Enter") {
                $("#customerAddress").focus();
            }
        });

    } else {
        $("#customerName").css('border', '2px solid red');
        $("#btnCustomerUpdate").prop('disabled', true);

    }
});

$("#customerAddress").keyup(function () {
    let inputCusAddress = $("#customerAddress").val();
    if (regExCusAddress.test(inputCusAddress)) {
        $("#customerAddress").css('border', '2px solid blue');
        checkUpdateCustomerValidation()
        $("#customerAddress").keydown(function (event) {
            if (event.key == "Enter") {
                $("#customerSalary").focus();
            }
        });

    } else {
        $("#customerAddress").css('border', '2px solid red');
        $("#btnCustomerUpdate").prop('disabled', true);

    }
});

$("#customerSalary").keyup(function () {
    let inputCusSalary = $("#customerSalary").val();
    if (regExCusSalary.test(inputCusSalary)) {
        $("#customerSalary").css('border', '2px solid blue');
        checkUpdateCustomerValidation()
        $("#customerSalary").keydown(function (event) {
            if (event.key == "Enter") {
                $("#btnCustomerUpdate").focus();
            }
        });
    } else {
        $("#customerSalary").css('border', '2px solid red');
        $("#btnCustomerUpdate").prop('disabled', true);
    }
});
//END UPDATE CUSTOMER VALIDATION

//END CUSTOMER VALIDATION


//START CUSTOMER BTN FUNCTIONS
$("#btnCustomerSave").click(function () {
    saveCustomer();
    clearAll();

});

$("#btnCustomerSearch").click(function () {
    searchCustomer();
});

$("#btnCustomerDelete").click(function () {
    let res = confirm("Do you really need to delete this customer ?");
    if (res) {
        deleteCustomer();
        clearAll();
    }
});

$("#btnCustomerUpdate").click(function () {
    updateCustomer();
});
//END CUSTOMER BTN FUNCTIONS


//START CUSTOMER CRUD OPERATIONS


function saveCustomer() {

    var serialize = $("#customerForm").serialize();

    $.ajax({
        url: customerUrl,
        method: "POST",
        data: serialize,
        success: function (res) {
            if (res.status == 200) {
                alert("Customer Added Successfully");
                loadAllCustomer();
                loadAllCustomerIds();
                getCustomerCount();
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    })
}

function deleteCustomer() {
    let customerId = $("#customerId").val();

    $.ajax({
        url: customerUrl + "/" + customerId,
        method: "DELETE",
        success: function (res) {
            alert("Customer Deleted Successfully");
            loadAllCustomer();
            getCustomerCount();
        },
        error: function (ob) {
            console.log(ob);
        }
    });
}

function updateCustomer() {
    let formData = {
        customerId: $("#customerId").val(),
        customerName: $("#customerName").val(),
        customerSalary: $("#customerSalary").val(),
        customerAddress: $("#customerAddress").val()
    }


    $.ajax({
        url: customerUrl,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (res) {
            if (res.status == 200) {
                alert("Update Customer Successfully");
                loadAllCustomer();
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
    clearAll();

}

function searchCustomer() {
    let customerId = $("#txtCustomerSearch").val();
    $.ajax({
        url: customerUrl + "/" + customerId,
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                var c = res.data;
                $("#customerId").val(c.customerId);
                $("#customerName").val(c.customerName);
                $("#customerSalary").val(c.customerSalary.toFixed(2));
                $("#customerAddress").val(c.customerAddress);
                $('#customerName,#customerSalary,#customerAddress').prop('disabled', false);
                $("#btnCustomerDelete").prop('disabled', false);
            } else {
                alert("No Customer For"+customerId);
                clearAll();
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
            clearAll();
        }
    });
}

function clearAll() {
    $('#txtCusId,#txtCusName,#txtCusAddress,#txtCusSalary,#txtCustomerSearch').val("");
    $('#customerId,#customerName,#customerAddress,#customerSalary').val("");

    $('#txtCusId,#txtCusName,#txtCusAddress,#txtCusSalary').css('border', '2px solid #ced4da');
    $('#customerId,#customerName,#customerAddress,#customerSalary').css('border', '2px solid #ced4da');

    $('#txtCusId').focus();
    http://localhost:8080/Spring/api/v1/customer

        $('#btnCustomerSave,#btnCustomerUpdate,#btnCustomerDelete').prop('disabled', true);
    $('#customerName,#customerSalary,#customerAddress').prop('disabled', true);

}

function loadAllCustomer() {
    $("#customerTable").empty();

    $.ajax({
        url: customerUrl + "/getAll",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.customerId}</td><td>${customer.customerName}</td><td>${customer.customerAddress}</td><td>${customer.customerSalary.toFixed(2)}</td></tr>`;
                $("#customerTable").append(row);
            }
        }
    });
}

function getCustomerCount() {
    $.ajax({
        url: customerUrl + "/count",
        method: "GET",
        success: function (res) {
            if (res.status == 200) {
                $("#txtCustomerCount").text(res.data);
            }
        },
        error: function (ob) {
            console.log(ob);
        }
    });
}


//END CUSTOMER CRUD OPERATIONS
