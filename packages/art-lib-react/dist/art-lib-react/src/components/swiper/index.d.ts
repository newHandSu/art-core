import './style.less';
import CoreComponent from '../../core/CoreComponent';
import { ISwiper } from './propstype';
import React from 'react';
import IScrollProbe from '../scroll/lib/iscroll-probe';
export default class Swiper extends CoreComponent<ISwiper, any> {
    constructor(props: any, context: any);
    private id;
    private hasEffects;
    private snapStepLast;
    private cloneNum;
    private stopAutoPlay;
    private timeout;
    private startX;
    private scrollProbe;
    private scroll;
    private snapStepX;
    static defaultProps: {
        swiperHeight: number;
        gap: number;
        loop: boolean;
        showSpinner: boolean;
        initialSlideIndex: number;
        autoPlayInterval: number;
        isTouchStopAutoPlay: boolean;
        slidesPerView: number;
        showPagination: boolean;
        centeredSlides: boolean;
        gradientBackground: never[];
        effect: string;
        flowRotation: number;
        flowDepth: number;
        flowShadow: boolean;
        onTap: (currentPage: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
        onSwiperChanged: (currentPage: any) => void;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    forceUpdateSwiper: () => void;
    private adjustStates;
    private initScroll;
    private clearTimeout;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private scrollElem;
    private handleScrollbarInitialize;
    bindScrollEvents(scrollProbe: IScrollProbe): void;
    getScrollInstance: () => void;
    private updateCurrentPage;
    private initSwiper;
    private autoPlay;
    private create3DStyle;
    private coverflowStyle;
    private rotateflowStyle;
    private slantScaleFlowStyle;
    private swiperItemClassName;
    private handleSwipeItemTap;
    getStatus: () => {
        currentPage: number;
        pages: any;
    };
    cancelAutoPlay: () => void;
    goToPage: (index: any) => void;
    next: () => void;
    prev: () => void;
    setAutoPlay: (autoPlay: boolean) => void;
    render(): JSX.Element;
}