import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useAuthGoogle from "../../../hooks/useAuthGoogle";

export default function OAuth() {
  const { signIn } = useAuthGoogle();

  const auth = (response) => {
    const token = response.credential;

    signIn(JSON.stringify(token));
  };

  return (
    <GoogleOAuthProvider clientId="308711825221-grcggo7i0s9u1kpr8ded16ns9q21e2sn.apps.googleusercontent.com">
      <div style={{ marginTop: 50, textAlign: "center" }}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            auth(credentialResponse);
          }}
          onError={() => {
            console.log("Erro no login");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
