import React from "react";

class CookieBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.acceptCookies = this.acceptCookies.bind(this);
  }

  componentDidMount() {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      this.setState({ show: true });
    }
  }

  acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    this.setState({ show: false });
  }

  render() {
    if (!this.state.show) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 flex flex-col sm:flex-row items-center justify-center gap-4 z-50">
        <p className="text-sm max-w-xl text-center sm:text-left">
          This site uses localStorage to save your to-do list data. By continuing, you accept this.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={this.acceptCookies}
            className="bg-indigo-600 hover:bg-indigo-700 transition rounded px-4 py-2 text-sm font-semibold"
          >
            Accept
          </button>
          <a
            href="/privacy.html"
            className="underline text-sm hover:text-indigo-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <a href="./policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </a>
        </div>
      </div>
    );
  }
}

export default CookieBanner;
