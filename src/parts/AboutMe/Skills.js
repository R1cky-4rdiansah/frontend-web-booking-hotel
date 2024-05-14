import React from "react";
import visual_sc from "../../assets/icon/icon_about/icons8-visual-studio-code-2019-96.png";
import figma from "../../assets/icon/icon_about/icons8-figma-96.png";
import canva from "../../assets/icon/icon_about/icons8-canva-96.png";
import whimsical from "../../assets/icon/icon_about/Whimsical.png";
import html from "../../assets/icon/icon_about/icons8-html-5-96.png";
import css from "../../assets/icon/icon_about/icons8-css3-96.png";
import js from "../../assets/icon/icon_about/icons8-javascript-96.png";
import php from "../../assets/icon/icon_about/icons8-php-96.png";
import bootstrap from "../../assets/icon/icon_about/icons8-bootstrap-96.png";
import tailwind from "../../assets/icon/icon_about/icons8-tailwind-css-96.png";
import laravel from "../../assets/icon/icon_about/icons8-laravel-96.png";
import codeigniter from "../../assets/icon/icon_about/icons8-codeigniter-is-an-open-source-software-rapid-development-web-framework-96.png";
import reactjs from "../../assets/icon/icon_about/icons8-react-native-96.png";
import express from "../../assets/icon/icon_about/icons8-express-js-96.png";
import node from "../../assets/icon/icon_about/icons8-nodejs-96.png";
import mongoDb from "../../assets/icon/icon_about/icons8-mongodb-96.png";
import mysql from "../../assets/icon/icon_about/icons8-mysql-96.png";

const data = [
  {
    name: "Visual Studio",
    val: visual_sc,
  },
  {
    name: "Figma",
    val: figma,
  },
  {
    name: "Canva",
    val: canva,
  },
  {
    name: "Whimsical",
    val: whimsical,
  },
  {
    name: "HTML",
    val: html,
  },
  {
    name: "CSS",
    val: css,
  },
  {
    name: "Javascript",
    val: js,
  },
  {
    name: "PHP",
    val: php,
  },
  {
    name: "Bootstrap",
    val: bootstrap,
  },
  {
    name: "Tailwind",
    val: tailwind,
  },
  {
    name: "Laravel",
    val: laravel,
  },
  {
    name: "Codeigniter",
    val: codeigniter,
  },
  {
    name: "React JS",
    val: reactjs,
  },
  {
    name: "Express JS",
    val: express,
  },
  {
    name: "Node JS",
    val: node,
  },
  {
    name: "MongoDB",
    val: mongoDb,
  },
  {
    name: "MySql",
    val: mysql,
  },
];

const Skills = () => {
  return (
    <section className="wrapper-text-skill">
      <h1 className="title-about font-semibold text-skill mx-auto">
        <span className="text-prmary-blue">Tools</span>{" "}
        <span className="text-primary-dark">&</span>{" "}
        <span className="text-primary-orange">Skills</span>
      </h1>
      <div className="wrapper-skill">
        {data.map((val, i) => (
          <div className=" flex flex-col items-center gap-2" key={i}>
            <img className="" src={val.val} />
            <span className="font-semibold text-secondary-gray text-sm">
              {val.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
