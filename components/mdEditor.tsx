import dynamic from 'next/dynamic'

const MarkDownEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export default MarkDownEditor
