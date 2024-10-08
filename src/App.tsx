import "./App.css";

function App() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Tersano Coding Challenge
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                Hassan Ahmad{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              My attempt on making a simple application that handles user
              authentication and product management.
            </p>
          </div>
        </div>
      </section>
      <section className="text-xl">
        <p>
          Frontend Repo:{" "}
          <a
            className="underline"
            href="https://github.com/hassanuahmad/tersano-fe"
            target="_blank"
          >
            https://github.com/hassanuahmad/tersano-fe
          </a>
        </p>
        <p>
          Backend Repo:{" "}
          <a
            className="underline"
            href="https://github.com/hassanuahmad/tersano-be"
            target="_blank"
          >
            https://github.com/hassanuahmad/tersano-be
          </a>
        </p>
        <p>
          YouTube Video:{" "}
          <a
            className="underline"
            href="https://youtu.be/oyxmSGTcr4E"
            target="_blank"
          >
            https://youtu.be/oyxmSGTcr4E
          </a>
        </p>
      </section>
    </>
  );
}

export default App;
