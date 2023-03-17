import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Login, Register } from "src/app/models/auth";
import { AuthService } from "src/app/services/auth.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";

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
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router
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
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/(\d)/),
          Validators.pattern(/(\W)|_/),
          Validators.pattern(/.{8,}/),
        ],
      ],
    });
  }

  onSubmitLogin(): void {
    const emailControl = this.loginForm.get("email");
    const passwordControl = this.loginForm.get("password");

    if (emailControl?.errors) {
      this.toast.error("Email inválido!");
    }
    if (passwordControl?.errors) {
      this.toast.error("Senha requerida!");
    }

    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authService.login(data).subscribe(
        (data) => {
          localStorage.setItem(
            "@fastbusines:access",
            JSON.stringify(data.access)
          );
          this.router.navigate(["/"]);
        },
        ({ error }) => {
          this.toast.error("Email ou senha inválidos.");
        }
      );
    }
  }

  onSubmitRegister(): void {
    const firstNameControl = this.registerForm.get("first_name");
    const emailControl = this.registerForm.get("email");
    const passwordControl = this.registerForm.get("password");

    if (firstNameControl?.errors) {
      this.toast.error("Primeiro nome inválido!");
    }
    if (emailControl?.errors) {
      this.toast.error("Email inválido!");
    }
    if (passwordControl?.errors) {
      this.toast.error("Senha inválida!");
      this.toast.error("Minímo 8 caracteres");
      this.toast.error("Minímo 1 caractere especial");
      this.toast.error("Minímo 1 letra maiúscula");
    }

    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.authService.register(data).subscribe(
        () => {
          this.toggleForm();
          this.registerForm.reset();
        },
        ({ error }) => {
          for (const key in error) {
            this.toast.error(error[key][0]);
          }
        }
      );
    }
  }

  toggleForm(): void {
    this.form = !this.form;
  }
}
