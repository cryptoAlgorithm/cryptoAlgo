var perf=firebase.performance();function pushWarning(e,t=!0){const n=perf.trace("pushWarning");n.start(),document.getElementById("infoText").innerHTML=e,$("#infoArea").fadeIn(),$("#contentArea").removeClass("unBlur"),$("#contentArea").addClass("blurred"),$("body").addClass("modal-open"),t&&setTimeout(function(){closeModal()},5e3),n.stop()}function verifyEmail(){firebase.auth().currentUser.sendEmailVerification().then(function(){pushWarning("Verification email sent. It may take up to 5 minutes to be received."),$("#verifyEmail").fadeOut()}).catch(function(e){pushWarning(e)})}$(window).keydown(function(e){e.ctrlKey&&83==e.keyCode&&(console.log("Ctrl+S event captured"),e.preventDefault())}),firebase.auth().onAuthStateChanged(function(e){if(e){if(e.isAnonymous)return document.getElementById("headText").innerHTML="Welcome to CryptoAlgo",document.getElementById("usrName").innerHTML="Hello, Anonymous User",document.getElementById("loginArea").style.display="none",$("#profileSpace").fadeIn("slow"),document.getElementById("outerSettingsBtn").style.display="none",document.getElementById("usrEmail").style.display="none",void(document.getElementById("signOutButton").style.paddingRight="0px");$("#warningBox1").fadeOut(0);e=firebase.auth().currentUser;document.getElementById("homeButton").style.display="inline-block",document.getElementById("outerSettingsBtn").style.display="inline-block",document.getElementById("usrEmail").style.display="block",document.getElementById("signOutButton").style.paddingRight="5px",console.log("Name: "+e.displayName),console.log("Email: "+e.email),console.log("Profile Photo: "+e.photoURL),console.log("Is email verified? "+e.emailVerified),console.log("User UID: "+e.uid),e.getIdToken(!0).then(function(e){console.log(e)}).catch(function(e){pushWarning(e)}),document.getElementById("headText").innerHTML="<br />Welcome to CryptoAlgo",e.displayName?(document.getElementById("usrName").innerHTML="Hello, "+e.displayName,document.title=e.displayName+"'s Account | CryptoAlgo"):e.email?(document.getElementById("usrName").innerHTML="Hello, "+e.email,document.title=e.email+"'s Account | CryptoAlgo"):(document.getElementById("usrName").innerHTML="Please enter a email in settings",document.title="My Account | CryptoAlgo"),document.getElementById("usrProfilePic").src=e.photoURL,e.emailVerified?document.getElementById("usrEmail").innerHTML=e.email+"<br/> Email verified":(document.getElementById("usrEmail").innerHTML=e.email+"<br/> Email not verified",$("#verifyEmail").fadeIn()),$("#loginArea").fadeOut(0),$("#profileSpace").fadeIn("slow")}else{const e=perf.trace("Render Login Screen");e.start(),document.title="CryptoAlgo | Login",$("#warningBox1").fadeOut(0),document.getElementById("headText").innerHTML="<br />CryptoAlgo Login",$("#profileSpace").fadeOut(0),$("#loginArea").fadeIn(),ui.start("#firebaseui-auth-container",uiConfig),e.stop()}});var closeOrOpen=!0;function usrSettingsCloseOpen(){closeOrOpen?($("#profileSettings").fadeIn(),$("#settingsBtn").fadeOut(function(){document.getElementById("settingsBtn").innerHTML="close",$("#settingsBtn").fadeIn()}),closeOrOpen=!1):($("#profileSettings").fadeOut(),$("#settingsBtn").fadeOut(function(){document.getElementById("settingsBtn").innerHTML="settings",$("#settingsBtn").fadeIn()}),closeOrOpen=!0)}function updateProfile(){const e=perf.trace("Change User Display Name");e.start();var t=document.getElementById("displayName").value;return 0==t.length?(pushWarning("The input is not filled in"),void e.stop()):0==t.trim().length?(pushWarning("The input does not have any text"),void e.stop()):void firebase.auth().currentUser.updateProfile({displayName:t}).then(function(){$("#usrName").fadeOut(function(){document.title=t+"'s Account | CryptoAlgo",document.getElementById("usrName").innerHTML="Hello, "+t,$("#usrName").fadeIn(),e.stop()})}).catch(function(t){pushWarning("Failed to update profile"),console.error("Failed to update profile:",t),e.stop()})}function signOutUser(){confirm("Are you sure you want to sign out of CryptoAlgo?")&&firebase.auth().signOut().then(function(){console.log("User signed out"),pushWarning("You have been signed out. Thank you for using CryptoAlgo."),closeAllSettings()},function(e){console.error("Sign Out Error",e)})}function changePwd(){firebase.auth().currentUser.updatePassword(document.getElementById("changePwd").value).then(function(){pushWarning("Successfully changed password."),$("#pwdChange").fadeIn()}).catch(function(e){pushWarning(e),$("#pwdChange").fadeIn()})}function changeUserPassword(){if(null!=firebase.auth().currentUser.email)if(document.getElementById("changePwd").value==document.getElementById("confirmChangePwd").value){if(document.getElementById("changePwd").value.match(/^[A-Za-z]\w{7,64}$/)){$("#pwdChange").fadeOut();var e=document.getElementById("oldPwd").value;if(document.getElementById("oldPwd").value.length<=5)return void changePwd();var t=firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email,e);firebase.auth().currentUser.reauthenticateWithCredential(t).then(function(){changePwd()}).catch(function(e){pushWarning(e)})}else pushWarning("Please meet the following requirements: 7-64 characters, starting with a letter"),$("#pwdChange").fadeIn()}else pushWarning("The passwords do not match");else pushWarning("Please enter a email address first before setting a password.")}function changeEmail(){firebase.auth().currentUser.updateEmail(document.getElementById("changeEmail").value).then(function(){pushWarning("Updated email address. Please verify your new email.")}).catch(function(e){pushWarning(e)})}function updateEmail(){if(firebase.auth().currentUser.email)var e=firebase.auth().currentUser.email;else changeEmail();var t=document.getElementById("emailChgPwd").value,n=firebase.auth.EmailAuthProvider.credential(e,t);firebase.auth().currentUser.reauthenticateWithCredential(n).then(function(){changeEmail()}).catch(function(e){pushWarning(e)})}function deleteUser(){var e=firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email,document.getElementById("acctDeletePwd").value);firebase.auth().currentUser.reauthenticateWithCredential(e).then(function(){prompt("Are you sure you want to delete your account? THIS ACTION CANNOT BE UNDONE! To continue, key in your email address.","Your email address")==firebase.auth().currentUser.email&&firebase.auth().currentUser.delete().then(function(){pushWarning("Your account has been deleted. You will be automatically logged out."),closeAllSettings()}).catch(function(e){pushWarning(e)})}).catch(function(e){pushWarning(e)})}document.getElementById("profilePicSelector").addEventListener("change",function(e){var t=e.currentTarget.files[0];switch(t.name.match(/\.([^\.]+)$/)[1]){case"tiff":case"pjp":case"pjpeg":case"jfif":case"tif":case"gif":case"svg":case"bmp":case"png":case"jpeg":case"svgz":case"jpg":case"webp":case"ico":case"xbm":case"dib":break;default:return void pushWarning("This file type is not allowed")}if(t){if(console.log(t.size),t.size>2e6)return void pushWarning("Image size too big. Please select a image that is <= 2MB.");var n=firebase.storage().ref().child("/"+firebase.auth().currentUser.uid+"/pfp."+t.name.split(".").pop()).put(t);n.on("state_changed",function(e){var t=e.bytesTransferred/e.totalBytes*100;switch(console.log("Upload is "+t+"% done"),document.getElementById("progressBar").style.width=t+"%",e.state){case firebase.storage.TaskState.PAUSED:console.log("Upload is paused");break;case firebase.storage.TaskState.RUNNING:console.log("Upload is running")}},function(e){document.getElementById("progressBar").style.width="0px",pushWarning(e)},function(){pushWarning("Uploaded profile picture"),document.getElementById("progressBar").style.width="0px",n.snapshot.ref.getDownloadURL().then(function(e){console.log("File available at",e);var t=e;firebase.auth().currentUser.updateProfile({photoURL:t}).then(function(){pushWarning("Updated profile image"),document.getElementById("usrProfilePic").src=t,$("#usrProfilePic").fadeOut(function(){$("#usrProfilePic").fadeIn()})}).catch(function(e){pushWarning(e)})})})}else pushWarning("No valid file selected")});var modal=document.getElementById("myModal"),span=document.getElementsByClassName("close")[0];function closeModal(){$("#infoArea").fadeOut(),$("#contentArea").removeClass("blurred"),$("#contentArea").addClass("unBlur"),$("body").removeClass("modal-open")}function closeAllSettings(){for(var e=document.getElementsByClassName("collapsible"),t=0;t<e.length;t++)try{e[t].classList.remove("active"),e[t].nextElementSibling.style.maxHeight&&(e[t].nextElementSibling.style.maxHeight=null)}catch{}$("#profileSettings").fadeOut(0),document.getElementById("settingsBtn").innerHTML="settings",closeOrOpen=!0}