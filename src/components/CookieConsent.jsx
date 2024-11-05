
import CookieConsent from "react-cookie-consent";

const CookieConsentPopup = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myWebsiteCookieConsent"
      expires={365}
      disableStyles={true}
      containerClasses="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg rounded-lg mx-auto max-w-[425px] p-6 mb-4"
      contentClasses="text-gray-600 text-sm"
      buttonClasses="w-full rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
      style={{ background: "#fff", color: "#333", textAlign: "center" }}
    >
      <h2 className="text-lg font-semibold" style={{ color: 'rgb(255,121,170)' }}>Cookie Policy</h2>
      <p className="mt-2">
        This website uses cookies to enhance your browsing experience and provide personalized content.
      </p>
      <p className="mt-2">
        By using this site, you agree to our use of cookies. We use cookies to improve your experience,
        analyze site traffic, and for marketing purposes. You can manage your cookie preferences at any time.
      </p>
    </CookieConsent>
  );
};

export default CookieConsentPopup;