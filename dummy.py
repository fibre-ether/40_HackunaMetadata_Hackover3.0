from dotenv import load_dotenv
import os
import time
from PIL import Image, ImageDraw
import requests
from flask import Flask, request, jsonify

# Import namespaces
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

app = Flask(__name__)

def Azure_Reader():
    global cv_client

    try:
        # Get Configuration Settings
        load_dotenv()
        cog_endpoint = os.getenv('COG_SERVICE_ENDPOINT')
        cog_key = os.getenv('COG_SERVICE_KEY')

        # Authenticate Computer Vision client
        credential = CognitiveServicesCredentials(cog_key) 
        cv_client = ComputerVisionClient(cog_endpoint, credential)
                
        # Menu for text reading functions        
        # image_file = os.path.join('images','Rome.pdf')
        image_file = 'driver license_sample.jpeg'
        image_file = 'credit score.png'
        
        img_url = 'https://raw.githubusercontent.com/fibre-ether/40_HackunaMetadata_Hackover3.0/login/src/assets/test_image.jpg'
        img_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Slovenian_ID_Card_2022_-_Front.jpg/250px-Slovenian_ID_Card_2022_-_Front.jpg'
        response = requests.get(img_url)
        if response.status_code:
            fp = open(f'greenland_01a.png', 'wb')
            fp.write(response.content)
            fp.close()
        
        output = GetTextRead('greenland_01a.png')
        # GetTextRead(image_file)  
        print(output)     

    except Exception as ex:
        print(ex)


def GetTextRead(image_file):
    print('Reading text in {}\n'.format(image_file))
    # Use Read API to read text in image
    output = {}
    output['name'] = image_file
    with open(image_file, mode="rb") as image_data:
        read_op = cv_client.read_in_stream(image_data, raw=True)

        # Get the async operation ID so we can check for the results
        operation_location = read_op.headers["Operation-Location"]
        operation_id = operation_location.split("/")[-1]

        # Wait for the asynchronous operation to complete
        while True:
            read_results = cv_client.get_read_result(operation_id)
            if read_results.status not in [OperationStatusCodes.running, OperationStatusCodes.not_started]:
                break
            time.sleep(1)

        # If the operation was successfuly, process the text line by line
        if read_results.status == OperationStatusCodes.succeeded:
            for page in read_results.analyze_result.read_results:
                text = []
                for line in page.lines:
                    text.append(str(line.text))
                    print(line.text)
                output['data'] = text
                # with open('note.txt', 'a') as note:
                #     note.write(str(text))
                #     note.write('\n')
    return output


@app.route('/')
def home():
    return {'message':'Server Running'}

@app.route('/image', methods=["POST"])
def ocr_img():
    data = request.get_json()
    print(data)
    return 'Recieved'

if __name__ == "__main__":
    app.run(debug=True)
    # Azure_Reader()