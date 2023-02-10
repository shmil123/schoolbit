import { ChangeEvent } from "react";

interface Props {
  languageID: string;
  changeLanguage: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ProgrammingLanguagePicker: React.FC<Props> = ({
  languageID,
  changeLanguage,
}) => {
  const languages = [
    {
      name: "C++",
      id: "cpp",
    },
    {
      name: "C#",
      id: "csharp",
    },
    {
      name: "CSS",
      id: "css",
    },
    {
      name: "Dart",
      id: "dart",
    },
    {
      name: "Elixir",
      id: "elixir",
    },
    {
      name: "F#",
      id: "fsharp",
    },
    {
      name: "Go",
      id: "go",
    },
    {
      name: "HTML",
      id: "html",
    },
    {
      name: "Java",
      id: "java",
    },
    {
      name: "JavaScript",
      id: "javascript",
    },
    {
      name: "Kotlin",
      id: "kotlin",
    },
    {
      name: "Less",
      id: "less",
    },
    {
      name: "Lua",
      id: "lua",
    },
    {
      name: "Objective-C",
      id: "objective-c",
    },
    {
      name: "Pascal",
      id: "pascal",
    },
    {
      name: "Perl",
      id: "perl",
    },
    {
      name: "PHP",
      id: "php",
    },
    {
      name: "Python",
      id: "python",
    },
    {
      name: "Ruby",
      id: "ruby",
    },
    {
      name: "Rust",
      id: "rust",
    },
    {
      name: "Scala",
      id: "scala",
    },
    {
      name: "SCSS",
      id: "scss",
    },
    {
      name: "Swift",
      id: "swift",
    },
    {
      name: "TypeScript",
      id: "typescript",
    },
    {
      name: "Visual Basic",
      id: "vb",
    },
    {
      name: "XML",
      id: "xml",
    },
    {
      name: "YAML",
      id: "yaml",
    },
  ];

  return (
    <select value={languageID} onChange={changeLanguage}>
      {languages.map((currentLanguage) => (
        <option value={currentLanguage.id} key={currentLanguage.id}>
          {currentLanguage.name}
        </option>
      ))}
    </select>
  );
};

export default ProgrammingLanguagePicker;
