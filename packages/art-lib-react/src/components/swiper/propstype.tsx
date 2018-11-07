/* tslint:disable:typedef-whitespace */
export interface ISwiper {
  gap                : number;                         // gap between two swipers (in px, 750px width scale)
  loop?              : boolean;                        // loop display swiper. Default: false;
  children           : JSX.Element[];                  // children JSX element
  swiperHeight       : number;                         // swiper element height (in px, 750px width scale)
  showSpinner?       : boolean;                        // whether show spinner before swiper image loaded. Default: true;
  autoPlayInterval?  : number;                         // swiper autoplay interval in ms. Default: 3000;
  slidesPerView?     : number;                         // slide per view. range: [1, 2). Default: 1
  centeredSlides?    : boolean;                        // whether center slide. Default: false;
  gradientBackground?: any[];                          // whether set gradient background;
  effect?            : string;                         // swiper effect: 'slide' | 'coverflow'; Default: 'slide';
  initialSlideIndex? : number;                         // Initial swiper index. Default: 0;
  showPagination?    : boolean;                        // whether show swiper pagination. Default: true;
  coverflowShadow?   : boolean;                        // show shadow; effect === 'coverflow', coverflowShadow default true, otherwise default false;
  coverflowRotate?   : number;                         // 3D rotateY value; Default: 40;
  coverflowDepth?    : number;                         // 3D translateZ value; Default: 40;
  onSwiperChanged?   : (currentPage: number) => void;  // onSwiperChanged callback
  onTap?             : (currentPage: number) => void;  // onTap callback
}