# VER-194 - determine backend functionality needed

## As a User I'd like to sign up to NICE network

| Screen                  | Frontend action     |                 Backend Effect                 |                                Payload |                                                                                                                        Note | Missing? |
| :---------------------- | :------------------ | :--------------------------------------------: | -------------------------------------: | --------------------------------------------------------------------------------------------------------------------------: | :------: |
| Homescreen_Click_Signup | Click Signup Button |                       -                        |                                      - |                                                                                                                             |          |
| Signup_Onboarding1      | Fill out fields     |                       -                        |                                      - |                                                                                                                             |          |
| Signup_Onboarding2      | Click Submit Button | POST -> /save-signup-information (to database) | {companyName, companiesHouseNo, email} |                                                                                                           local DB involved | MISSING  |
|                         |                     |       POST -> /send-information-to-NICE        | {companyName, companiesHouseNo, email} |                                                                                           info sent to admin for KYC checks | MISSING  |
|                         |                     |                       -                        |                                      - |                                                                                           KYC passed or not on Admin's side |          |
|                         |                     |        POST -> /inform-invitation-sent         |                  {invitationSent:true} | let User know if they passed KYC checks and cryptographic material has been sent out or if there was an issue in KYC checks | MISSING  |
| Signup_Onboarding3      | Back to homepage    |                       -                        |                                      - |                                                                                                                             |          |

---

## As a User I'd like to complete my sign up

| Screen                         | Frontend action               |         Backend Effect         |                  Payload |                                                                                       Note | Missing? |
| :----------------------------- | :---------------------------- | :----------------------------: | -----------------------: | -----------------------------------------------------------------------------------------: | :------: |
| Homescreen_Click_Onboarding    | Click Complete Onboarding Btn |               -                |                        - |                                                                                            |          |
| CompleteOnboarding_scanQRCode1 | Scan QR code & Submit Btn     |   POST -> /accept-invitation   | {cryptographic material} |                                                                                            |          |
|                                |                               |                                |                          |                                          connection records created on user and NICE admin |          |
| CompleteOnboarding_Complete    | Back to homepage              |               -                |                        - |                                                                                            |          |
|                                | Error/Re-request invitation   | POST -> /re-request-invitation |                        - | should there be a scenarion for re-requesting cryptographic material if there is an issue? | MISSING  |

---

## As a user I'd like to see my Verifiable Claims

| Screen                      | Frontend action          |   Backend Effect    |                          Payload |                           Note | Missing? |
| :-------------------------- | :----------------------- | :-----------------: | -------------------------------: | -----------------------------: | :------: |
| Homescreen_Click_SSIProfile | Click SSI Profile Button |          -          |                                - |                                |          |
| TBC/view profile            | Upon load                | GET -> /credentials | {verifiable claims registered[]} |           gets all credentials |          |
|                             |                          |   GET -> /profile   |           {Profile information } | profile info ...from local db? | MISSING  |
