export class ComponentRoutes {
  // General
  static readonly LANDING_PAGE = 'landing-page';
  static readonly NOTFOUND = 'not-found';
  static readonly DASHBOARD = 'dashboard';
  static readonly USERAUTH = 'auth';
  static readonly LOGIN = 'login';
  static readonly ADMIN_LOGIN = 'admin-login';
  static readonly FORGOTPASSWORD = 'forgot-password';
  static readonly VERIFYOTP = 'verify-otp';
  static readonly VERIFY_AADHAR = 'verify-aadhar';
  static readonly NEWPASSWORD = 'new-password';
  static readonly HOME = '';
  static readonly PROFILE = 'profile';

  // Resident
  static readonly USER = 'user';
  static readonly USERLIST = 'list';
  static readonly USERADD = 'add';
  static readonly AADHAR_PENDING_USER = 'aadhar-pending-list';
  static readonly DELETEUSERLIST = 'delete-user-list';

  // Sarpanch
  static readonly SARPANCH = 'sarpanch';
  static readonly SARPANCHLIST = 'list';
  static readonly SARPANCHADD = 'add';
  static readonly SARPANCHHISTORY = 'history'

  // Customer
  static readonly CUSTOMER = 'customer';
  static readonly CUSTOMERLIST = 'list';
  static readonly CUSTOMERADD = 'add';

  // Vendor
  static readonly VENDOR = 'vendor';
  static readonly VENDORLIST = 'list';
  static readonly VENDORADD = 'add';

  // Manage Role
  static readonly MANAGEROLE = 'managerole';
  static readonly MANAGEROLELIST = 'list';
  static readonly MANAGEROLEADD = 'add';

  // Service Category
  static readonly SERVICECETEGORY = 'serviceCategory';
  static readonly SERVICECETEGORYLIST = 'list';
  static readonly SERVICECETEGORYADD = 'add';

  // Booking
  static readonly BOOKING = 'booking';
  static readonly BOOKINGLIST = 'list';
  static readonly BOOKINGADD = 'add';
}
