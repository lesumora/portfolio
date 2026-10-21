import { useEffect } from 'react'

declare global {
  interface Window {
    amazon_connect?: {
      (...args: unknown[]): void
      ac?: unknown[][]
    }
  }
}

const SCRIPT_ID = '8b3f3c09-9bed-4f67-81d7-a9b2a92a3fa9'
const SCRIPT_SRC =
  'https://portfolio-demo-connect-bulsu.my.connect.aws/connectwidget/static/amazon-connect-chat-interface-client.js'
const SNIPPET_ID =
  'QVFJREFIanRYbGxTNVVoejB5M3JnaFRweWltK2UvSHdGN25WOWRuajAza05OYi9Fc0FGUCtScmo5cUFNZVhwUXowTE9xVTg2QUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNUXdRWjFpR2Vob0trTkM5RkFnRVFnQ3N2M3FCNEVaT3QwbTM1Z3NXWUZjZm90eUxmanZyZ080SFd6WVdQK3k2aXloemtDRUo1cWxYeTFiamo6OlVPT0NiSFVUUnZ4elp2cHBzZUNmdCtWZ2xNcm9FUmhIOURiS3RDOXZjeWI0U2FnbVg3RnA5T3hNcU9UZGhTbUtzUnJNR2l5R0xCMWMvMHJ6eVIxS3k3a0lqK3ZpMHhDY3diRWVDYm1XQ2FHNGZmaTZxTm5DQWIrVjJwRlhYdzdMSDY1NUV1ZzJOUnZsNk4xQVNPWDdidWg0WlpTeDB3Yz0='

export function AmazonConnectWidget() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) {
      return
    }

    window.amazon_connect =
      window.amazon_connect ||
      function (...args: unknown[]) {
        window.amazon_connect?.ac?.push(args)
      }
    window.amazon_connect.ac = window.amazon_connect.ac || []

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.id = SCRIPT_ID
    script.async = true
    document.head.appendChild(script)

    window.amazon_connect('styles', {
      iconType: 'CHAT',
      openChat: { color: '#ffffff', backgroundColor: '#123456' },
      closeChat: { color: '#ffffff', backgroundColor: '#123456' },
    })
    window.amazon_connect('snippetId', SNIPPET_ID)
    window.amazon_connect('supportedMessagingContentTypes', [
      'text/plain',
      'text/markdown',
      'application/vnd.amazonaws.connect.message.interactive',
      'application/vnd.amazonaws.connect.message.interactive.response',
    ])
  }, [])

  return null
}
