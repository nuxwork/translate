# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web

import openai

def translate(lang, text):
    openai.api_key = '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'
    print("翻译成{0}: {1}".format(lang, text))
    response = openai.ChatCompletion.create(
        max_tokens=2048,
        model='gpt-3.5-turbo',
        messages=[{"role": "user", "content": "翻译成{0}: {1}".format(lang, text)}]
    )

    # 打印生成的文本
    print(response.choices[0].message.content)
    return response.choices[0].message.content

class MainHandler(tornado.web.RequestHandler):
    def get(self, lang, text):
        self.write('{"text": "'+translate(lang, text)+'", "lang": "'+lang+'"}');

def make_app():
    return tornado.web.Application([
        (r"/translate/([^/]+)/([^/]+)", MainHandler),
    ])

if __name__ == '__main__':
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()