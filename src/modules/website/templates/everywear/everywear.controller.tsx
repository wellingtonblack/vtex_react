import * as React from "react";
import { BaseController } from "../base.controller";
import "./everywear.page.scss";

export class EveryWearController extends BaseController {
  /**
   *
   */
  constructor() {
    
    const buttons = document.querySelectorAll(".cat");
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < buttons.length; index++) {
      const button = buttons[index];
      button.addEventListener("click", (event) => {
        const pabels = document.querySelectorAll(".tab-pane");
        const hash = button.querySelector("a").getAttribute("href");
        // tslint:disable-next-line:prefer-for-of
        for (let _index = 0; _index < pabels.length; _index++) {
          const pabel = pabels[_index];
          pabel.classList.remove("active");
        }

        document.querySelector(hash).classList.add("active");

      });
    }

    document.getElementById("vidwrap").addEventListener("click", playVideo);
    function playVideo() {
        document.getElementById("vidwrap").innerHTML = "<div id='loader'>";
        document.getElementById("vidwrap").style.background = "#000";
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() { 
            // tslint:disable-next-line:semicolon
            document.getElementById("vidwrap").innerHTML = "</div><iframe src='https://www.youtube.com/embed/j2BP0yOlquI?autoplay=1'></iframe>"
            document.getElementById("loader").style.display = "none";
        }, 1000);
    }


    super();

  }
}

