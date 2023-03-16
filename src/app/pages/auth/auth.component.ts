import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Login, Register } from "src/app/models/auth";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  form: boolean = false;

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm(new Login());
    this.createRegisterForm(new Register());
  }

  createLoginForm(login: Login): void {
    this.loginForm = this.formBuilder.group({
      email: [login.email, [Validators.required, Validators.email]],
      password: [login.password, [Validators.required]],
    });
  }
  createRegisterForm(register: Register): void {
    this.registerForm = this.formBuilder.group({
      first_name: [
        register.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ],
      ],
      email: [
        register.email,
        [Validators.required, Validators.email, Validators.maxLength(128)],
      ],
      password: [
        register.password,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ],
      ],
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe((data) => {
        localStorage.setItem(
          "@fastbusines:access",
          JSON.stringify(data.access)
        );
      });
    }
  }
  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.authService.register(data).subscribe((data) => {});
    }
  }

  toggleForm(): void {
    this.form = !this.form;
  }
}
