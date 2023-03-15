import { Component, OnInit } from "@angular/core";
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
  profileInformations!: IProfileResponse;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.profileInformations = data;
    });
  }
}
