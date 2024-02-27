export interface Application {
  companyName: string
  companiesHouseNumber: string
  email: string
}

export interface SubmitApplication extends Application {
  did: string
}

export interface VerificationCode {
  verificationCode: string
}
