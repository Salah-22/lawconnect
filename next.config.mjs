/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://lawconnect-gqopp23tw-salah-22s-projects.vercel.app",
    DB_LOCAL_URI:
      "mongodb+srv://abdousaboundji5:abdou2024mongodb@cluster0.t9nwl7c.mongodb.net/lawconnect?retryWrites=true&w=majority",
    DB_URI:
      "mongodb+srv://abdousaboundji5:abdou2024mongodb@cluster0.t9nwl7c.mongodb.net/lawconnect?retryWrites=true&w=majority",

    STRIPE_WEBHOOK_SECRET: "whsec_7zewPLAmNOsO95p8HXN2GvX22nM5MzIy",

    STRIPE_SECRET_KEY:
      "sk_test_51OkDY9FambFmTsz5twMjStYPadpoEMfH7g8ION987V7C1kzIIh4zDkEvguxOOXyP0nKwF2Ko4Vb7WAshCrqbCIVe00wVtNgY1j",

    CLOUDINARY_CLOUD_NAME: "drej3k2j0",
    CLOUDINARY_API_KEY: "169984454928562",
    CLOUDINARY_API_SECRET: "mUxZP9Dx8KGmRVQt3lSGq6ptdP4",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    SMTP_FROM_NAME: "BookIT",

    NEXTAUTH_URL: "https://lawconnect-gqopp23tw-salah-22s-projects.vercel.app",
    NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF",
    REVALIDATE_TOKEN: "JK34J50JSDKFLJSDKF034I5DKFJSDK4IJFKSDJHFDYGDH",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
