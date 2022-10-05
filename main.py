from dotenv import load_dotenv
import os
import time
import requests
from flask import Flask, request, jsonify

# Import namespaces
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

app = Flask(__name__)

def Azure_Reader(img_url):
    global cv_client

    try:
        # Get Configuration Settings
        load_dotenv()
        cog_endpoint = os.getenv('REACT_APP_COG_SERVICE_ENDPOINT')
        cog_key = os.getenv('REACT_APP_COG_SERVICE_KEY')

        # Authenticate Computer Vision client
        credential = CognitiveServicesCredentials(cog_key) 
        cv_client = ComputerVisionClient(cog_endpoint, credential)
                
        # Menu for text reading functions        
        # image_file = os.path.join('images','Rome.pdf')
        
        response = requests.get(img_url)
        if response.status_code:
            fp = open(f'greenland_01a.png', 'wb')
            fp.write(response.content)
            fp.close()
        
        # output = GetTextRead('greenland_01a.png', img_url=img_url)
        output = GetTextRead('driver license_sample.jpeg', img_url=img_url)
        # GetTextRead(image_file)  
        print(output)   
        return output  

    except Exception as ex:
        print(ex)
        output = {}
        output['verified'] = False
        return output


def GetTextRead(image_file, img_url):
    print('Reading text in {}\n'.format(image_file))
    # Use Read API to read text in image
    output = {}
    output['name'] = image_file
    output['image'] = img_url
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
                    if len(line.text.split(' '))>1:
                        for ele in line.text.split(' '):
                            text.append(str(ele))
                    else:
                        text.append(str(line.text))
                    # print(line.text)
                output['data'] = text
    return output


@app.route('/')
def home():
    return {'message':'Server Running'}

@app.route('/verifyImage', methods=["POST"])
def ocr_img():
    data = request.get_json()
    img_url = data['image_url']
    name = data['name'].strip()
    output = Azure_Reader(img_url)
    
    if len(name.split(' '))>1:
        output['verified'] = True
        for ele in name.split(' '):
            print(ele)
            if ele not in output['data']:
                output['verified'] = False 
                break 
    else:  
        if name.upper() in output['data']:
            output['verified'] = True
        else:
            output['verified'] = False
    return output

if __name__ == "__main__":
    app.run(debug=True)
    # Azure_Reader()