 var toggleForm = function() {
      document.getElementById('signupForm').style.display = document.getElementById('signupForm').style.display === 'none' ? 'block' : 'none';
      document.getElementById('loginForm').style.display = document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
    };

  var  signup = function() {
      var  name = document.getElementById("name").value;
      var  email = document.getElementById("email").value;
      var  password = document.getElementById("password").value;
      var  signupError = document.getElementById("signupError");
      signupError.textContent = "";

      if (!validateEmail(email)) {
        signupError.textContent = "Please enter a valid email address.";
        return;
      }

      var  users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some(function(user) { return user.email === email; })) {
        signupError.textContent = "Email already exists. Please choose another one.";
        return;
      }

      users.push({ name: name, email: email, password: password });
      localStorage.setItem("users", JSON.stringify(users));

      //  تسجيل  الدخول  تلقائيًا  بعد  التسجيل  بنجاح
      alert("Signup successful! Logging you in...");
      document.getElementById("loginEmail").value = email;
      document.getElementById("loginPassword").value = password;
      login(); 
    };

  var login = function() {
      var  email = document.getElementById("loginEmail").value;
      var  password = document.getElementById("loginPassword").value;
      var  loginError = document.getElementById("loginError");
      loginError.textContent = "";

      var  users = JSON.parse(localStorage.getItem("users")) || [];
      var  user = users.find(function(user) { return user.email === email && user.password === password; });

      if (user) {
        //  تعيين  المستخدم  المسجل  دخوله  في  localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        //  تحديث  صفحة  home  باسم  المستخدم
        document.getElementById("userName").textContent = user.name;

        //  إظهار  صفحة  home  و  إخفاء  نماذج  تسجيل  الدخول  و  التسجيل
        document.getElementById("homePage").style.display = "block";
        document.getElementById("signupForm").style.display = "none";
        document.getElementById("loginForm").style.display = "none";
      } else {
        loginError.textContent = "Invalid email or password.";
      }
    };

 var validateEmail = function(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

 var logout = function() {
      localStorage.removeItem("loggedInUser");
      document.getElementById("homePage").style.display = "none";
      document.getElementById("loginForm").style.display = "block"; //  إظهار  نموذج  تسجيل  الدخول  بشكل  افتراضي
    };