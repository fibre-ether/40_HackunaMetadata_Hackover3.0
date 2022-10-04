from dotenv import load_dotenv
import os
import time
from PIL import Image, ImageDraw
from matplotlib import pyplot as plt
import requests

# Import namespaces
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

def main():

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
        response = requests.get(img_url)
        if response.status_code:
            fp = open(f'greenland_01a.png', 'wb')
            fp.write(response.content)
            fp.close()
        GetTextRead('greenland_01a.png')
        GetTextRead(image_file)
            
                

    except Exception as ex:
        print(ex)

def GetTextOcr(image_file):
    print('Reading text in {}\n'.format(image_file))
    # Use OCR API to read text in image
    with open(image_file, mode="rb") as image_data:
        ocr_results = cv_client.recognize_printed_text_in_stream(image_data)

    # Prepare image for drawing
    fig = plt.figure(figsize=(7, 7))
    img = Image.open(image_file)
    draw = ImageDraw.Draw(img)

    # Process the text line by line
    for region in ocr_results.regions:
        for line in region.lines:

            # Show the position of the line of text
            l,t,w,h = list(map(int, line.bounding_box.split(',')))
            draw.rectangle(((l,t), (l+w, t+h)), outline='magenta', width=5)

            # Read the words in the line of text
            line_text = ''
            for word in line.words:
                line_text += word.text + ' '
            print(line_text.rstrip())

    # Save the image with the text locations highlighted
    plt.axis('off')
    plt.imshow(img)
    outputfile = f'{image_file}_output.jpg'
    fig.savefig(outputfile)
    print('Results saved in', outputfile)

def GetTextRead(image_file):
    print('Reading text in {}\n'.format(image_file))
    # Use Read API to read text in image
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
                with open('note.txt', 'a') as note:
                    note.write(str(text))
                    note.write('\n')


if __name__ == "__main__":
    main()