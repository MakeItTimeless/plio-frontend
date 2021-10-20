import { mount } from "@vue/test-utils";
import CircularProgress from "@/components/UI/Progress/CircularProgress.vue";

describe("CircularProgress.vue", () => {
  it("renders properly with default values", () => {
    const wrapper = mount(CircularProgress);
    expect(wrapper).toBeTruthy();
  });

  it("computed properties are created properly", () => {
    const radius = 100;
    const progress = 75;
    const stroke = 50;
    const wrapper = mount(CircularProgress, {
      props: {
        radius: radius,
        stroke: stroke,
        result: {
          enabled: true,
          title: "temp text",
          value: progress,
        },
      },
    });

    const expectedNormalizedRadius = radius - stroke * 2;
    const expectedCircumference = expectedNormalizedRadius * 2 * Math.PI;
    const expectedStrokeDashoffset =
      expectedCircumference - (progress / 100) * expectedCircumference;

    expect(wrapper.vm.normalizedRadius).toBe(expectedNormalizedRadius);
    expect(wrapper.vm.circumference).toBe(expectedCircumference);
    expect(wrapper.vm.strokeDashoffset).toBe(expectedStrokeDashoffset);
    expect(wrapper.vm.isResultShown).toBeTruthy();

    expect(wrapper.find('[data-test="result"]').exists()).toBeTruthy();
  });
});
