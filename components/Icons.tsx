import React from 'react';

const SVGIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.children}
  </svg>
);

export const Icons = {
  logo: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.042.506.092.763.149M9.75 3.104A3.375 3.375 0 009 5.25c0 .607.153 1.183.424 1.69M5 14.5c-.092.03-.182.064-.27.098M5 14.5A3.375 3.375 0 004.5 18c0 .607.153 1.183.424 1.69M5 14.5L14.25 5.25m-9.25 9.25L14.25 18m0-12.75l9.25 9.25" />
    </SVGIcon>
  ),
  dashboard: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3m-16.5 0h16.5m-16.5 0H3.75m16.5 0h.008v.008h-.008V3zm-16.5 0H3.75V3.75m16.5-0.75V3.75m0 0H20.25m-16.5 0H6.75m11.25 0h-1.5m-1.5 0H9.75" />
    </SVGIcon>
  ),
  table: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5A1.125 1.125 0 002.25 18.375M20.625 19.5a1.125 1.125 0 001.125-1.125M20.625 19.5a1.125 1.125 0 01-1.125 1.125M3.375 5.25h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 5.25A1.125 1.125 0 002.25 4.125M20.625 5.25a1.125 1.125 0 001.125-1.125M20.625 5.25a1.125 1.125 0 01-1.125 1.125m-17.25 0h17.25m-17.25 0h17.25" />
    </SVGIcon>
  ),
  analyst: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 8.25v10.5A2.25 2.25 0 006.75 21z" />
    </SVGIcon>
  ),
  upload: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </SVGIcon>
  ),
  spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <SVGIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.695v4.992h-4.992v-4.992z" />
    </SVGIcon>
  ),
  error: (props: React.SVGProps<SVGSVGElement>) => (
     <SVGIcon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </SVGIcon>
  ),
};
