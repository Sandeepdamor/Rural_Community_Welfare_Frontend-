export class ComponentRoutes {
  // General
  static readonly LANDING_PAGE = '';
  static readonly NOTFOUND = 'not-found';
  static readonly DASHBOARD = 'dashboard';
  static readonly USERAUTH = 'auth';
  static readonly LOGIN = 'login';
  static readonly ADMIN_SARPANCH_LOGIN = 'login1';
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
  static readonly SARPANCHHISTORY = 'history';

  //Project
  static readonly PROJECT = 'project';
  static readonly PROJECTLIST = 'list';
  static readonly PROJECTADD = 'add';
  static readonly PENDING_REJECT_PROJECT_LIST = 'pending-rejected-list';

  //Announcements
  static readonly ANNOUNCEMENTS = 'announcements';
  static readonly ANNOUNCEMENTLIST = 'list';
  static readonly ADDANNOUNCEMENTS = 'add';
  static readonly DELETEANNOUNCEMENTS = 'delete';

  //Grievance
  static GRIEVANCELIST = 'grievance-list';
  static GRIEVANCEDELETE = 'grievance-delete';
  static GRIEVANCES = 'grievance';
  static GRIEVANCEUPDATE = 'grievance-update';
  static GRIEVANCEADD = 'grievance-add';

  //Schemes
  static readonly SCHEMES = 'schemes';
  static readonly SCHEMESLIST = 'list';
  static readonly SCHEMEADD = 'add';
  static readonly DELETESCHEMESLIST = 'delete-list';
  static readonly APPLY_SCHEME_REQUEST = 'apply-request';

  //Category
  static readonly CATEGORY = 'category';
  static readonly CATEGORYADD = 'add';
  static readonly CATEGORYLIST = 'list';

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
