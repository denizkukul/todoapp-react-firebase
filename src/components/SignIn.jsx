import { GoogleAuthProvider, GithubAuthProvider, signInWithRedirect, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { auth } from "../firebase";

function SignIn() {
  const signInEmailRef = useRef();
  const signInPwordRef = useRef();
  const signUpEmailRef = useRef();
  const signUpPwordRef = useRef();
  const signUpRepeatPwordRef = useRef();
  const [signInTab, setSignInTab] = useState(true);

  const signIn = (e) => {
    let provider
    switch (e.currentTarget.dataset.provider) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
      case "anonymous":
        provider = null;
        break;
      default:
        break;
    }

    if (provider !== null) {
      signInWithRedirect(auth, provider);
    }
    else {
      signInAnonymously(auth);
    }
  }

  const signInWithEmail = () => {
    let email = signInEmailRef.current.value;
    let pword = signInPwordRef.current.value;
    signInWithEmailAndPassword(auth, email, pword)
      .catch((error) => {
        alert(error);
      })
    signInEmailRef.current.value = "";
    signInPwordRef.current.value = "";
  }

  const signUp = () => {
    let email = signUpEmailRef.current.value;
    let pword = signUpPwordRef.current.value;
    let repeat = signUpRepeatPwordRef.current.value;
    if (pword === repeat) {
      createUserWithEmailAndPassword(auth, email, pword)
        .catch((error) => {
          alert(error);
        })
    }
    else {
      alert("Passwords do not match!")
      signUpPwordRef.current.value = "";
      signUpRepeatPwordRef.current.value = "";
    }
    signUpEmailRef.current.value = "";
  }

  const goToNextOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.nextElementSibling.focus();
    }
  }

  const submitOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.nextElementSibling.click();
    }
  }

  return (
    <div className="flex justify-center sm:items-center min-h-screen text-lg text-color-700">
      <div className="flex flex-col bg-color-400 w-full sm:max-w-[750px] sm:tall:pb-[50px]">
        <div className="flex justify-between">
          <button className={`${signInTab ? "bg-color-200 border-b-color-200 cursor-default" : "bg-color-300 hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000"} outline-none h-[60px] w-[370px] sm:rounded-t-[5px] border-r border-b sm:border border-color-600 relative sm:top-[1px]`} onClick={() => setSignInTab(true)} tabIndex={`${signInTab ? "-1" : "0"}`}>Sign In</button>
          <button className={`${!signInTab ? "bg-color-200 border-b-color-200 cursor-default" : "bg-color-300 hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000"} outline-none h-[60px] w-[370px] sm:rounded-t-[5px] border-b sm:border border-color-600 relative sm:top-[1px]`} onClick={() => setSignInTab(false)} tabIndex={`${!signInTab ? "-1" : "0"}`}>Sign Up</button>
        </div>

        <div className="bg-color-200 flex flex-col h-full sm:h-[450px] sm:border border-color-600 sm:rounded-b-[5px]">
          {
            signInTab ?
              <>
                <div className="flex flex-col items-center w-4/5 mx-auto pt-[50px]">
                  <input className="py-[13px] px-[15px] w-full text-base outline-none rounded-[5px] border border-color-600 mb-5 placeholder:text-color-600" type="email" placeholder="E-mail" ref={signInEmailRef} onKeyPress={goToNextOnEnter} />
                  <input className="py-[13px] px-[15px] w-full text-base outline-none rounded-[5px] border border-color-600 mb-5 placeholder:text-color-600" type="password" placeholder="Password" ref={signInPwordRef} onKeyPress={submitOnEnter} />
                  <button className="h-[70px] w-[50%] xs:w-[30%] my-[10px] bg-color-000 outline-none border border-color-600 rounded-[5px] hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000" onClick={signInWithEmail}>Sign In</button>
                </div>
                <div className="flex-1 flex justify-start xs:justify-between pt-3 sm:pt-0 items-center xs:items-start sm:items-center w-4/5 mx-auto pb-5 leading-none flex-col xs:flex-row">
                  <button className="h-[70px] w-[50%] xs:w-[30%] my-[10px] bg-color-000 outline-none border border-color-600 rounded-[5px] hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000" data-provider="google" onClick={signIn}><span className="text-base">Sign in with</span><br /><span
                    className=" text-[19px]">Google</span></button>
                  <button className="h-[70px] w-[50%] xs:w-[30%] my-[10px] bg-color-000 outline-none border border-color-600 rounded-[5px] hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000" data-provider="github" onClick={signIn}><span className="text-base">Sign in with</span><br /><span
                    className=" text-[19px]">Github</span></button>
                  <button className="h-[70px] w-[50%] xs:w-[30%] my-[10px] bg-color-000 outline-none border border-color-600 rounded-[5px] hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000" data-provider="anonymous" onClick={signIn}><span className="text-base">Continue as</span><br /><span
                    className=" text-[19px]">Guest</span></button>
                </div>
              </> :
              <div className="flex flex-col items-center w-4/5 mx-auto pt-[50px]">
                <input className="py-[13px] px-[15px] w-full text-base outline-none rounded-[5px] border border-color-600 mb-5 placeholder:text-color-600" type="email" placeholder="E-mail" ref={signUpEmailRef} onKeyPress={goToNextOnEnter} />
                <input className="py-[13px] px-[15px] w-full text-base outline-none rounded-[5px] border border-color-600 mb-5 placeholder:text-color-600" type="password" placeholder="Password" ref={signUpPwordRef} onKeyPress={goToNextOnEnter} />
                <input className="py-[13px] px-[15px] w-full text-base outline-none rounded-[5px] border border-color-600 mb-5 placeholder:text-color-600" type="password" placeholder="Repeat Password" ref={signUpRepeatPwordRef} onKeyPress={submitOnEnter} />
                <button className="h-[70px] w-[50%] xs:w-[30%] my-[10px] bg-color-000 outline-none border border-color-600 rounded-[5px] hover:bg-color-500 hover:text-color-900 focus-visible:bg-color-500 focus-visible:text-color-900 hover:cursor-pointer active:bg-color-700 active:text-color-000" onClick={signUp}>Sign Up</button>
              </div>
          }
        </div>

      </div>
    </div >
  );
}

export default SignIn;