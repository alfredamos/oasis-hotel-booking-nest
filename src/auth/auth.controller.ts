import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { UserInfo } from 'src/models/userInfoModel';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles('Admin', 'Guest', 'Staff')
  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Roles('Admin', 'Guest', 'Staff')
  @Patch('edit-profile')
  editProfile(@Body() editProfileDto: EditProfileDto) {
    return this.authService.editProfile(editProfileDto);
  }

  @IsPublic()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @IsPublic()
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Roles('Admin')
  @Patch('change-role')
  updateUserRole(
    @Body() roleChangeDto: ChangeUserRoleDto,
    @CurrentUser() user: UserInfo,
  ) {
    return this.authService.changeUserRole(roleChangeDto, user);
  }
}
