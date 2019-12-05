import { mount } from "@vue/test-utils";
import HelloComponent from "./hello";

describe("Hello.ts", () => {
  it("should render", () => {
    const name = "World";
    const initialEnthusiasm = 5;

    const wrapper = mount(HelloComponent, {
      propsData: {
        name,
        initialEnthusiasm,
      },
    });
    expect(wrapper.find(".greeting").text()).toBe("Hello World!!!!!");
  });
});
