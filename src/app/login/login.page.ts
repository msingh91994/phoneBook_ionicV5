import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private signUpForm: FormGroup;
  private loginForm: FormGroup;
  private submitted = false;
  private loginDetails: any;
  private slideOpts = {
    allowTouchMove: false
  };

  @ViewChild('logoContainer', { read: ElementRef, static: false }) logoContainer;
  @ViewChild('slides', { static: false }) slides;
  // private formRefreshAnnouncedSource = new Subject();
  // formRefreshSource$ = this.formRefreshAnnouncedSource.asObservable();

  constructor(public alertController: AlertController, private formBuilder: FormBuilder, private renderer: Renderer2, private router: Router, private storage: Storage) {
    // private googlePlus: GooglePlus

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      // }, {
      //   validators: this.password.bind(this)
    });
  }


  // password(signUpForm) {
  //   console.log(signUpForm)
  //   const { value: password } = signUpForm.value.password;
  //   const { value: confirmPassword } = signUpForm.value.confirmpassword
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpForm.value))
  }

  gPlusLogin() {
    // this.googlePlus.login({})
    //   .then(res => {
    //     console.log(res)
    //     this.loginDetails = res;
    //   })
    //   .catch(err => console.error(err));
  }

  gPlusLogout() {
    // this.googlePlus.logout();
    console.log("logout")
  }

  slideToSignUp() {
    this.renderer.addClass(this.logoContainer.nativeElement.children[0], 'logo-signUp');
    this.renderer.addClass(this.logoContainer.nativeElement.children[1], 'sub-title-signUp');

    setTimeout(() => {
      this.slides.slideTo(1, 300);
    }, 100);
  }
  slideToLogin() {
    this.renderer.removeClass(this.logoContainer.nativeElement.children[0], 'logo-signUp');
    this.renderer.removeClass(this.logoContainer.nativeElement.children[1], 'sub-title-signUp');

    setTimeout(() => {
      this.slides.slideTo(0, 300);
    }, 100);
  }

  signUpAccount() {
    if (this.signUpForm.value.password == this.signUpForm.value.confirmPassword) {
      // console.log(this.signUpForm.value)
      let saveUser: any = [];
      this.storage.get('createdAccount').then((val) => {
        if (val)
          saveUser = val
      });
      setTimeout(() => {
        if (saveUser.filter(({ email }) => email == this.signUpForm.value.email).length >= 1) {
          console.log('user alredy exist')
        } else {
          this.storage.set('loggedInUser', this.signUpForm.value)
          saveUser.push(this.signUpForm.value)
          this.storage.set('createdAccount', saveUser)
          this.router.navigate(['/home'])
        }
      }, 100);
    } else {
      this.presentAlert("Password didn't match")
    }
  }

  login() {
    // setTimeout(() => {
    let getUserList: any = [];
    this.storage.get('createdAccount').then((val) => {
      if (val)
        getUserList = [...getUserList, ...val]

      let loginUser: any = []
      loginUser = getUserList.filter(({ email }) => email == this.loginForm.value.email)
      console.log(loginUser)

      if (loginUser.length >= 1) {
        this.storage.set('loggedInUser', loginUser)
        if (loginUser[0].email == this.loginForm.value.email && loginUser[0].password == this.loginForm.value.password) {
          this.router.navigate(['/home'])
        } else {
          console.log('incorrect password')
          this.presentAlert("Incorrect Password")
        }
      }
      else
        console.log('user not found');
      this.presentAlert("User not found")

    });

    // }, 100);
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      // subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}