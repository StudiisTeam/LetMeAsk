import { ReactNode } from "react";
import classnames from "classnames";
type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  children: ReactNode;
};

function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionsProps) {
  return (
    <div
      className={classnames(
        "dark:bg-slate-700 rounded-lg shadow-lg p-6",
        { "opacity-30 border-0": isAnswered },
        { "border-[1px] border-purple-500": isHighlighted }
      )}
    >
      <p className="text-slate-50">{content}</p>
      <footer className="flex justify-between mt-6 items-center">
        <div className="flex items-center gap-2">
          <img
            src={author.avatar}
            alt={author.name}
            className="rounded-full w-8"
          />
          <span className="text-slate-400 text-sm">{author.name}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {" "}
          {children}
        </div>
      </footer>
    </div>
  );
}

export default Question;
