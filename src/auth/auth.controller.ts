import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { UserInfo } from 'src/models/userInfoModel';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch()
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Patch()
  editProfile(@Body() editProfileDto: EditProfileDto) {
    return this.authService.editProfile(editProfileDto);
  }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('change-role')
  updateUserRole(
    @Body() roleChangeDto: ChangeUserRoleDto,
    @CurrentUser() user: UserInfo,
  ) {
    return this.authService.changeUserRole(roleChangeDto, user);
  }
}
