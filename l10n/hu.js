OC.L10N.register(
    "registration",
    {
    "Registration is not allowed with the following domains:" : "A regisztráció a következő domainek számára nem engedélyezett:",
    "Registration is only allowed with the following domains:" : "A regisztráció csak a következő domainek számára engedélyezett:",
    "A problem occurred sending email, please contact your administrator." : "Váratlan hiba lépett fel az email küldéskor, kérem lépjen kapcsolatba a rendszergazdával.",
    "The entered verification code is wrong" : "A megadott ellenőrző kód hibás",
    "The verification failed." : "Sikertelen ellenőrzés.",
    "Invalid username policy regex" : "Érvénytelen felhasználónév házirend regex",
    "Saved" : "Mentve",
    "No such group" : "Nincs ilyen csoport",
    "Register" : "Regisztráció",
    "The email address you entered is not valid" : "A megadott email cím érvénytelen",
    "Verify your %s registration request" : "Ellenőrizze a %sregisztrációs kérelmét.",
    "Registration" : "Regisztráció",
    "Email address verified, you can now complete your registration." : "E-mail cím ellenőrizve, most befejezheti regisztrációját.",
    "Click the button below to continue." : "Kattintson az alábbi gombra a folytatáshoz.",
    "Verification code: %s" : "Ellenőrző kód: %s",
    "Continue registration" : "Regisztráció folytatása",
    "New user \"%s\" has created an account on %s" : "A \"%s\" új felhasználó létrehozott egy fiókot a(z) %s webhelyen",
    "New user registered" : "Új felhasználó regisztrálva",
    "Enable now" : "Engedélyezés",
    "A user has already taken this email, maybe you already have an account?" : "Egy felhasználó már használja ezt az email címet, lehet, hogy  van már hozzáférése?",
    "You can <a href=\"%s\">log in now</a>." : "<a href=\"%s\"> Most bejelentkezhet </a>.",
    "Registration with this email domain is not allowed." : "Ezzel az e-mail domainnel történő regisztráció nem megengedett.",
    "Please provide a valid display name." : "Kérlek érvényes nevet adj meg.",
    "Please provide a valid login name." : "Kérjük, adjon meg érvényes bejelentkezési nevet.",
    "The login name you have chosen already exists." : "A választott felhasználó név már létezik.",
    "The phone number needs to contain the country code." : "A telefonszámnak tartalmaznia kell az országkódot.",
    "The phone number is invalid." : "A telefonszám érvénytelen.",
    "Please provide a password." : "Adjon meg egy jelszót.",
    "Please provide a valid phone number." : "Kérjük, adjon meg érvényes telefonszámot.",
    "Unable to create user, there are problems with the user backend." : "Nem lehet felhsználót létrehozni, hiba lépett fel a felhasználói háttér szolgáltatással.",
    "Unable to set user email: " : "Nem lehet beállítani az email címet:",
    "Registration app auto setup" : "Regisztrációs alkalmazás automatikus beállítása",
    "This app allows users to self-register a new account using their email address." : "Ez az alkalmazás lehetővé teszi a felhasználók számára, hogy saját e-mail címükkel regisztráljanak új fiókot.",
    "User registration\n\nThis app allows users to register a new account.\n\n# Features\n\n- Add users to a given group\n- Allow-list with email domains (including wildcard) to register with\n- Admins will be notified via email for new user creation or require approval\n- Supports Nextcloud's Client Login Flow v1 and v2 - allowing registration in the mobile Apps and Desktop clients\n\n# Web form registration flow\n\n1. User enters their email address\n2. Verification link is sent to the email address\n3. User clicks on the verification link\n4. User is lead to a form where they can choose their username and password\n5. New account is created and is logged in automatically" : "Felhasználó regisztráció\nEz az alkalmazás lehetővé teszi a felhasználók számára, hogy új fiókot regisztráljanak.\n# Jellemzők\n- Felhasználók hozzáadása egy adott csoporthoz\n- A regisztrációnál megengedett e-mail domainek listája (helyettesítő karakterekkel)\n- Jóváhagyás szükséges vagy az adminisztrátorok e-mailben értesítést kapnak az új felhasználók létrehozásáról\n- Támogatja a Nextcloud v1 és v2 kliens bejelentkezési folyamatát - lehetővé teszi a regisztrációt a mobilalkalmazásokban és az asztali kliensekben\n\n# Webes űrlap regisztráció folyamata\n\n1. A felhasználó megadja az e-mail címét\n2. Az ellenőrző linket az e-mail címre küldjük\n3. A felhasználó az ellenőrző linkre kattint\n4. A felhasználó egy olyan űrlapra vezet, ahol kiválaszthatja felhasználónevét és jelszavát\n5. Új fiók jön létre, és a felhasználó automatikusan bejelentkezik",
    "Registration settings" : "Regisztrációs beállítások",
    "Require admin approval" : "Rendszergazdai engedély szükséges",
    "Enabling \"admin approval\" will prevent registrations from mobile and desktop clients to complete as the credentials cannot be verified by the client until the user was enabled." : "Az \"adminisztrátori jóváhagyás\" engedélyezése megakadályozza a mobil- és asztali kliensek regisztrációinak befejezését, mivel a hitelesítő adatokat az ügyfél nem tudja ellenőrizni, amíg a felhasználót nem engedélyezték.",
    "Registered users default group" : "A regisztrált felhasználók alapértelmezett csoportja",
    "Select group" : "Csoport kiválasztása",
    "Email settings" : "E-mail beállítások",
    "Allowed email domain" : "Engedélyezett email domain",
    "Block listed email domains instead of allowing them" : "Feketelistára az e-mail domainekkel ahelyett, hogy engedélyeznék őket",
    "Disable email verification" : "E-mail ellenőrzés letiltása",
    "User settings" : "Felhasználó beállításai",
    "Force email as login name" : "E-mail kényszerítése bejelentkezési névként",
    "Login name policy" : "A bejelentkezési névre vonatkozó irányelvek",
    "Regular expression to validate login names" : "Reguláris kifejezés a bejelentkezési nevek érvényesítéséhez",
    "If configured, login names will be validated through the regular expression. If the validation fails the user is prompted with a generic error. Make sure your regex is working correctly." : "Ha be van állítva, akkor a bejelentkezési nevek a reguláris kifejezésen keresztül elellnőrződnek. Ha az érvényesítés sikertelen, a felhasználó általános hibát kap. Győződjön meg arról, hogy a regex megfelelően működik.",
    "Show full name field" : "A teljes név mező mutatása",
    "Enforce full name field" : "A teljes név mező kikényszerítése",
    "Show phone field" : "Telefonszám mező mutatása",
    "Enforce phone field" : "A telefon mező kikényszerítése",
    "User instructions" : "Felhasználói utasítások",
    "Caution: The user instructions will not be translated and will therefore be displayed as configured below for all users regardless of their actual language." : "Vigyázat: A felhasználói utasítások nem kerülnek lefordításra, ezért minden felhasználó számára az alábbiak szerint kerülnek megjelenítésre, függetlenül azok tényleges nyelvétől.",
    "Registration form instructions" : "A regisztrációs űrlapra vonatkozó utasítások",
    "A short message that is shown to the user in the registration process." : "Rövid üzenet, amelyet  a regisztráció során a felhasználónak mutatunk.",
    "Add additional user instructions (e.g. for choosing their login name). If configured the text is displayed in the account creation step of the registration process." : "Adjon hozzá további felhasználói utasításokat (például a bejelentkezési nevük megválasztásához). Ha be van állítva, akkor a szöveg megjelenik a regisztrációs folyamat fiók létrehozásának lépésében.",
    "Verification email instructions" : "Ellenőrző e-mail utasítások",
    "A short message that is shown to the user in the verification email." : "Rövid üzenet, amely megjelenik a felhasználónak az ellenőrző e-mailben.",
    "Add additional user instructions (e.g. for choosing their login name). If configured the text is embedded in the verification-email." : "Adjon hozzá további felhasználói utasításokat (például a bejelentkezési nevük megválasztásához). Ha be van állítva, a szöveget be fogjuk ágyazni az ellenőrző e-mailbe.",
    "Blocked email domains" : "Email domainek feketelistán",
    "Allowed email domains" : "Engedélyezett email domainek",
    "Show the blocked email domains to users" : "A letiltott e-mail domainek megjelenítése a felhasználók számára",
    "Show the allowed email domains to users" : "Az engedélyezett e-mail domainek megjelenítése a felhasználók számára",
    "An error occurred while saving the settings" : "Hiba történt a beállítások mentése közben",
    "Loading …" : "Betöltés …",
    "Approval required" : "Jóváhagyás szükséges",
    "Your account has been successfully created, but it still needs approval from an administrator." : "Hozzáférése sikeresen elkészült, azonban még szükséges a rendszergazda jóváhagyására.",
    "Email" : "E-mail",
    "Continue" : "Folytatás",
    "Request verification code" : "Ellenőrző kód kérése",
    "Request verification link" : "Ellenőrző hivatkozás kérése",
    "Back to login" : "Vissza a bejelentkezéshez",
    "Welcome, you can create your account below." : "Üdvözlünk, alább elkészítheted a saját fiókodat.",
    "Login name" : "Bejelentkezési név",
    "Full name" : "Teljes név",
    "Phone number" : "Telefonszám",
    "Password" : "Jelszó",
    "Create account" : "Fiók létrehozása",
    "Verification code" : "Ellenőrző kód",
    "Verify" : "Ellenőrzés"
},
"nplurals=2; plural=(n != 1);");
