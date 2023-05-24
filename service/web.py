# -*- coding: utf-8 -*-
import tornado.ioloop
import tornado.web
import json
import openai

def translate(lang, text):
    openai.api_key = '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'
    print("中英互译: {1}".format(lang, text))
    response = openai.ChatCompletion.create(
        max_tokens=2048,
        model='gpt-3.5-turbo',
        messages=[{"role": "user", "content": "翻译成{0}: {1}".format(lang, text)}]
    )

    # 打印生成的文本
    print(response.choices[0].message.content)
    return response.choices[0].message.content

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        # param1 = self.get_body_argument("data")
        data = self.request.body
        print('请求：' + data.decode("utf-8"))
        try:
            json_data = json.loads(data)
            print(json_data)
            self.write('{"text": "' + translate(json_data['lang'], json_data['text']) + '", "lang": "' +
                       json_data['lang'] + '"}')
        except json.JSONDecodeError:
            self.set_status(400)
            self.write("Invalid JSON data")
            return

def make_app():
    return tornado.web.Application([
        (r"/translate", MainHandler)
    ])

if __name__ == '__main__':
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()