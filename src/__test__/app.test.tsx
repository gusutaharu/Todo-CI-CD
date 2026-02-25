import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Todoアプリ!" }),
    ).toBeInTheDocument();
  });
  test("タスクを追加することができる", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);
    const list = screen.getByRole("list");
    expect(within(list).getByText("新しいタスク")).toBeInTheDocument();
  });
  test("タスクを完了することができる", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "新しいタスク" } });
    fireEvent.click(addButton);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  test("完了したタスクの数が表示されている", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "テストタスク１" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "テストタスク２" } });
    fireEvent.click(addButton);

    const checkbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(checkbox);

    const completedCount = screen.getByText("完了済み: 1 / 2");
    expect(completedCount).toBeInTheDocument();
  });
  test("タスクがない場合、タスクがないことを示すメッセージが表示される", () => {
    render(<App />);
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
    expect(
      screen.getByText("新しいタスクを追加してください"),
    ).toBeInTheDocument();
  });
  test("空のタスクを追加できない", () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいタスクを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(addButton);
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });
});
