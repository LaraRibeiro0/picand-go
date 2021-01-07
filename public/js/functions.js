function registerClient() {
   var form = $("#form-register-client");
   var formData = getFormData(form);

   // pedido ao servidor
   $.post("http://localhost:4000/api/register/client/", formData).done((res) => {
      setSession(res);
      var redirectPage = "../index.html";
      showMessage(res.message, redirectPage);
   }).fail((err) => {
      console.log(err.responseJSON.message);
   });
}


function registerMerchant() {
   var form = $("#form-register-merchant")[0];
   var formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: "http://localhost:4000/api/register/merchant/",

      success: (res) => {
         var redirectPage = "../index.html";
         showMessage(res.message, redirectPage);
      },
      error: (err) => {
         console.log(err.responseJSON.message);
      }
   });
}


function registerDriver() {
   var form = $("#form-register-driver")[0];
   var formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: "http://localhost:4000/api/register/driver/",

      success: (res) => {
         var redirectPage = "../index.html";
         showMessage(res.message, redirectPage);
      },
      error: (err) => {
         console.log(err.responseJSON.message);
      }
   });
}


function registerAdmin() {
   var form = $("#form-register-admin");
   var formData = getFormData(form);

   // pedido ao servidor
   $.post("http://localhost:4000/api/register/admin/", formData).done((res) => {
      var redirectPage = "../index.html";
      showMessage(res.message, redirectPage);
   }).fail((err) => {
      console.log(err.responseJSON.message);
   });
}


function login() {
   var form = $("#form-login");
   var formData = getFormData(form);

   // pedido ao servidor
   $.post("http://localhost:4000/api/login/", formData).done((res) => {
      setSession(res);
      var redirectPage = "../index.html";
      showMessage(res.message, redirectPage);
   }).fail((err) => {
      console.log(err.responseJSON.message);
   });
}


function createProduct() {
   var form = $("#form-create-product")[0];
   var formData = new FormData(form);
   var token = sessionStorage.getItem("token");

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      processData: false,
      type: "post",
      url: "http://localhost:4000/api/products/create/",

      success: (res) => {
         var redirectPage = "../index.html";
         showMessage(res.message, redirectPage);
      },
      error: (err) => {
         console.log(err.responseJSON.message);
      }
   });
}


function getFormData(form) {
   var unindexedData = form.serializeArray();
   var indexedData = {};

   $.map(unindexedData, function (n) {
      indexedData[n["name"]] = n["value"];
   });

   return indexedData;
}


function setSession(res) {
   sessionStorage.setItem("token", res.token);
   sessionStorage.setItem("id", res.data.id);
   sessionStorage.setItem("username", res.data.username);
   sessionStorage.setItem("name", res.data.name);
   sessionStorage.setItem("email", res.data.email);
   sessionStorage.setItem("type", res.data.type);
}


function showMessage(message, page) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": message,
      "onok": () => redirectPage(page)
   }).show();
}


function redirectPage(page) {
   location.href = page;
}