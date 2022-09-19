function getCurrentScreenSize() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return {
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      screen: "phone",
    };
  } else if (window.matchMedia("(max-width: 991px)").matches) {
    return {
      isDesktop: false,
      isTablet: true,
      isMobile: true,
      screen: "tablet",
    };
  } else if (window.matchMedia("(max-width: 1199px)").matches) {
    return {
      isDesktop: true,
      isTablet: false,
      isMobile: false,
      screen: "desktop",
    };
  }
  return {
    isDesktop: true,
    isTablet: false,
    isMobile: false,
    screen: "large-desktop",
  };
}

const { screen, isDesktop, isTablet, isMobile } = getCurrentScreenSize();

export { screen, isDesktop, isMobile, isTablet };
