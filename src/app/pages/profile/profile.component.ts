import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  IProfileResponse,
  ProfileService,
} from "src/app/services/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  profileInformations!: IProfileResponse;

  fieldSelected = "first_name";

  formProfile: FormGroup = this.formBuilder.group({
    first_name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(64)],
    ],
    email: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(128)],
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ],
    ],
  });

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profileInformations = data;
    });
  }

  changeField(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.fieldSelected = target.value;
  }

  onSubmit(): void {
    const field = this.fieldSelected;
    const form = this.formProfile;

    if (form.controls[field].valid) {
      const data = form.value;
      Object.keys(data).filter((key) => {
        if (key !== field) delete data[key];
      });

      this.profileService
        .updateProfile(data, this.profileInformations.id)
        .subscribe((data) => {
          this.profileInformations = data;
        });
    }

    this.formProfile.reset();
  }
}
