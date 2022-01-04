function About() {
  return (
    <div className="text-color-700">
      <div>
        <h1 className="text-[22px]">
          App
        </h1>
        <p className="ml-5">
          Todo app with functions to add, edit and remove list items.
        </p>
        <h1 className="text-[22px] mt-3">
          Built with
        </h1>
        <h2 className="text-lg ml-5 mt-1">
          Frontend
        </h2>
        <ul className="list-disc ml-10">
          <li>App is built with React and Tailwindcss.</li>
          {/* <li>Animations are made with css transitions.</li> */}
          <li>Tailwindcss screen breakpoints are used for responsive design.</li>
          <li>Icons are taken from material design icons.</li>
        </ul>
        <h2 className="text-lg ml-5 mt-1">
          Backend
        </h2>
        <ul className="list-disc ml-10">
          <li>Server side of the app uses firebase services.</li>
          <li>Firebase authentication for user login.</li>
          <li>Firebase realtime databse for storing data.</li>
          <li>Firebase hosting for deployment.</li>
        </ul>
        <h1 className="text-[22px] mt-3">
          Links
        </h1>
        <ul className="ml-5">
          <li>
            <a href="" className="hover:text-color-800 hover:underline">
              Github
            </a>
          </li>
          <li>
            <a href="https://reactjs.org/" className="hover:text-color-800 hover:underline">
              React
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/" className="hover:text-color-800 hover:underline">
              Tailwindcss
            </a>
          </li>
          <li>
            <a href="https://google.github.io/material-design-icons/" className="hover:text-color-800 hover:underline">
              Material Design Icons
            </a>
          </li>
          <li>
            <a href="https://firebase.google.com/" className="hover:text-color-800 hover:underline">
              Firebase
            </a>
          </li>
        </ul>
        <div className="mt-5 pb-12 text-center">
          Created by <a href="https://github.com/denizkukul">Deniz Kukul</a>
        </div>
      </div>
    </div>
  );
}

export default About;