import dynamic from 'next/dynamic';

export const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
