import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import axios from 'axios';
import RoutesPath from '../../constants/routes-path';

import settings from '../../config';

import Header from './components/Header';
import Button from '../../components/Button';
  

const PAGE_ICON = 'plugin';
const BLANK = '_blank';
const placeholder = 'Um chatbot que pergunte ao cliente o seu nome e CPF, depois encaminhe para atendimento humano';
const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [inputText, setInputText] = useState(placeholder);
    const [outputText, setOutputText] = useState('');  

  
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };  

    const history = useHistory();
    const { t } = useTranslation();

    const handleNavigation = useCallback(
        (path, params = {}) => {
            history.push(path, params);
        },
        [history]
    );

    const onSubmit = async () => {
        const apiUrl = 'https://secure-backend-api.stilingue.com.br/blip-nlu-hack-ai/prod/hack-ai/chat/completions';
  
        const requestData = {
            "deployment": "gpt-4-32k", // gpt-4-32k gpt-35-turbo
            "messages": [
                {
                    "role": "system",
                    "content": "Você é um assistente de IA que cria chatbots baseado no exemplo. Os blocos onboarding e fallback são obrigatórios. Cada bloco deve ter um ID diferente. Responda apenas com um JSON válido: \"\n{\"flow\":{\"onboarding\":{\"$contentActions\":[{\"input\":{\"bypass\":false,\"$cardContent\":{\"document\":{\"id\":\"a9f6665c-2e05-489f-a72a-63acf23b3131\",\"type\":\"text/plain\"},\"editable\":false,\"deletable\":false,\"position\":\"right\",\"editing\":false}}}],\"$conditionOutputs\":[{\"stateId\":\"welcome\",\"conditions\":[{\"source\":\"input\",\"comparison\":\"matches\",\"values\":[\".*\"]}],\"$id\":\"8ec691ec-8c54-4302-9ce1-e5549422b674\",\"$connId\":\"con_3\"}],\"$enteringCustomActions\":[],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"fallback\"},\"$tags\":[],\"id\":\"onboarding\",\"root\":true,\"$title\":\"Start\",\"$position\":{\"top\":\"120px\",\"left\":\"644px\"}},\"fallback\":{\"$contentActions\":[{\"input\":{\"bypass\":true,\"$cardContent\":{\"document\":{\"id\":\"27582a94-06eb-4590-8c5e-4af48e7437bf\",\"type\":\"text/plain\"},\"editable\":false,\"deletable\":true,\"position\":\"right\",\"editing\":false}}}],\"$conditionOutputs\":[{\"stateId\":\"error\",\"conditions\":[{\"source\":\"input\",\"comparison\":\"matches\",\"values\":[\".*\"]}],\"$id\":\"73e56bf6-1a7e-4379-a178-8642d147819e\",\"$connId\":\"con_8\"}],\"$enteringCustomActions\":[],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"onboarding\"},\"$tags\":[],\"id\":\"fallback\",\"$title\":\"Exceptions\",\"$position\":{\"top\":\"120px\",\"left\":\"877px\"}},\"welcome\":{\"$contentActions\":[{\"action\":{\"$id\":\"1bd11da5-2f60-4135-9b2b-f623dbe3a795\",\"$typeOfContent\":\"\",\"type\":\"SendMessage\",\"settings\":{\"id\":\"00000000-0000-0000-0000-000000000000\",\"type\":\"application/vnd.lime.chatstate+json\",\"content\":{\"state\":\"composing\",\"interval\":1000}},\"$cardContent\":{\"document\":{\"id\":\"00000000-0000-0000-0000-000000000000\",\"type\":\"application/vnd.lime.chatstate+json\",\"content\":{\"state\":\"composing\",\"interval\":1000}},\"editable\":true,\"deletable\":true,\"position\":\"left\",\"editing\":false}},\"$invalid\":false,\"$$hashKey\":\"object:1066\"},{\"action\":{\"$id\":\"5700d09a-44a4-4de0-8702-fbdb7bd5ec59\",\"$typeOfContent\":\"\",\"type\":\"SendMessage\",\"settings\":{\"id\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"text/plain\",\"content\":\"Olá! {{contact.name}}!\\nSeja bem-vindo(a)!\"},\"$cardContent\":{\"document\":{\"id\":\"00000000-0000-0000-0000-000000000001\",\"type\":\"text/plain\",\"content\":\"Olá! {{contact.name}}!\\nSeja bem-vindo(a)!\"},\"editable\":true,\"deletable\":true,\"position\":\"left\",\"editing\":false}},\"$invalid\":false,\"$$hashKey\":\"object:1067\"},{\"input\":{\"bypass\":false,\"$cardContent\":{\"document\":{\"id\":\"0e67f63d-8811-4314-bdb3-df64c0de3ab6\",\"type\":\"text/plain\",\"content\":\"User input\"},\"editable\":false,\"deletable\":true,\"position\":\"right\",\"editing\":false},\"$invalid\":false},\"$invalid\":false,\"$$hashKey\":\"object:1068\"}],\"$conditionOutputs\":[],\"$enteringCustomActions\":[{\"$id\":\"08b53ba4-c7da-446c-bfa9-571f7101efd3\",\"$typeOfContent\":\"\",\"type\":\"TrackEvent\",\"$title\":\"Event tracking\",\"$invalid\":false,\"settings\":{\"extras\":{},\"category\":\"event\",\"action\":\"test\"},\"conditions\":[]},{\"$id\":\"c3899fa0-7b6c-427e-8e05-cc38dab2617d\",\"$typeOfContent\":\"\",\"type\":\"MergeContact\",\"$title\":\"Set contact\",\"$invalid\":false,\"settings\":{\"extras\":{}},\"conditions\":[]},{\"$id\":\"aeee3b11-36cc-494f-b1df-75b7b4870da0\",\"$typeOfContent\":\"\",\"type\":\"ExecuteScript\",\"$title\":\"Execute script\",\"$invalid\":true,\"$validationError\":{},\"settings\":{\"function\":\"run\",\"source\":\"/**\\n* All input variables needs to be passed as function param;\\n* Objects received as param needs to be parsed. Ex.: JSON.parse(inputVariable1);\\n* Objects returned needs to be stringfied. Ex.: JSON.stringify(inputVariable1);\\n**/\\nfunction run(inputVariable1, inputVariable2) {\\n\\treturn \\\"Hello BLiP\\\"; //Return value will be saved as \\\"Return value variable\\\" field name\\n}\",\"inputVariables\":[\"bucket.?\",\"resource.?\",\"application.identifier\",\"application.domain\",\"application.instance\"]},\"conditions\":[]}],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"fallback\",\"$invalid\":false},\"$tags\":[{\"background\":\"#2cc3d5\",\"label\":\"Script\",\"id\":\"blip-tag-849d7f6a-1c12-6f05-a2ce-1d184ec69210\"}],\"id\":\"welcome\",\"$title\":\"Welcome\",\"$position\":{\"top\":\"240px\",\"left\":\"644px\"},\"$invalidContentActions\":false,\"$invalidOutputs\":false,\"$invalidCustomActions\":true,\"$invalid\":true},\"error\":{\"$contentActions\":[{\"action\":{\"$id\":\"9db7041c-f90a-4a87-bac7-35c1a4d87573\",\"$typeOfContent\":\"\",\"type\":\"SendMessage\",\"settings\":{\"id\":\"00000000-0000-0000-0000-000000000002\",\"type\":\"application/vnd.lime.chatstate+json\",\"content\":{\"state\":\"composing\",\"interval\":1000}},\"$cardContent\":{\"document\":{\"id\":\"00000000-0000-0000-0000-000000000002\",\"type\":\"application/vnd.lime.chatstate+json\",\"content\":{\"state\":\"composing\",\"interval\":1000}},\"editable\":true,\"deletable\":true,\"position\":\"left\",\"editing\":false}}},{\"action\":{\"$id\":\"15bb43ec-511c-45a0-a114-aa973a75b7d9\",\"$typeOfContent\":\"\",\"type\":\"SendMessage\",\"settings\":{\"id\":\"00000000-0000-0000-0000-000000000003\",\"type\":\"text/plain\",\"content\":\"Desculpe, não consegui entender!\"},\"$cardContent\":{\"document\":{\"id\":\"00000000-0000-0000-0000-000000000003\",\"type\":\"text/plain\",\"content\":\"Desculpe, não consegui entender!\"},\"editable\":true,\"deletable\":true,\"position\":\"left\",\"editing\":false}}},{\"input\":{\"bypass\":true,\"$cardContent\":{\"document\":{\"id\":\"7008dc82-45bd-4692-a048-3250455ccdc1\",\"type\":\"text/plain\"},\"editable\":false,\"deletable\":true,\"position\":\"right\",\"editing\":false}}}],\"$conditionOutputs\":[],\"$enteringCustomActions\":[],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"onboarding\"},\"$tags\":[],\"id\":\"error\",\"$title\":\"Default error\",\"$position\":{\"top\":\"240px\",\"left\":\"877px\"}},\"desk:ca5bf9b1-ac9e-4f87-822f-e6bc83e076fe\":{\"$contentActions\":[{\"input\":{\"bypass\":false,\"conditions\":[{\"source\":\"context\",\"variable\":\"desk_forwardToDeskState_status\",\"comparison\":\"equals\",\"values\":[\"Success\"]}],\"$cardContent\":{\"document\":{\"id\":\"4ff9e8a9-6af4-439e-bf16-a06129216243\",\"type\":\"text/plain\",\"textContent\":\"User input\",\"content\":\"User input\"},\"editable\":false,\"deletable\":false,\"position\":\"right\",\"editing\":false},\"$invalid\":false},\"$invalid\":false,\"$$hashKey\":\"object:797\"}],\"$conditionOutputs\":[{\"$isDeskOutput\":true,\"conditions\":[{\"source\":\"context\",\"variable\":\"input.type\",\"comparison\":\"equals\",\"values\":[\"application/vnd.iris.ticket+json\"]},{\"source\":\"context\",\"variable\":\"input.content@status\",\"comparison\":\"equals\",\"values\":[\"ClosedAttendant\"]}],\"$invalid\":false,\"$$hashKey\":\"object:817\",\"stateId\":\"error\",\"$connId\":\"con_41\",\"$id\":\"1586ae71-6eb0-405c-bf5d-b14cfafc13e4\"},{\"$isDeskOutput\":true,\"conditions\":[{\"source\":\"context\",\"variable\":\"input.type\",\"comparison\":\"equals\",\"values\":[\"application/vnd.iris.ticket+json\"]},{\"source\":\"context\",\"variable\":\"input.content@status\",\"comparison\":\"equals\",\"values\":[\"ClosedClient\"]}],\"$invalid\":false,\"$$hashKey\":\"object:818\",\"stateId\":\"onboarding\",\"$connId\":\"con_56\",\"$id\":\"6434fff1-5fa2-4c61-9d1f-7d3b2b133ded\"},{\"$isDeskOutput\":true,\"conditions\":[{\"source\":\"context\",\"variable\":\"input.type\",\"comparison\":\"equals\",\"values\":[\"application/vnd.iris.ticket+json\"]},{\"source\":\"context\",\"variable\":\"input.content@status\",\"comparison\":\"equals\",\"values\":[\"ClosedClientInactivity\"]}],\"$invalid\":false,\"$$hashKey\":\"object:819\",\"stateId\":\"onboarding\",\"$connId\":\"con_46\",\"$id\":\"7b8580db-26bd-4b1d-855c-a381a7015481\"},{\"$isDeskOutput\":true,\"$isDeskDefaultOutput\":true,\"conditions\":[{\"source\":\"context\",\"variable\":\"desk_forwardToDeskState_status\",\"comparison\":\"equals\",\"values\":[\"Error\"]}],\"stateId\":\"fallback\",\"$invalid\":false,\"$$hashKey\":\"object:820\"}],\"$enteringCustomActions\":[{\"$id\":\"8b20596f-6fa5-4794-bdbf-5de7f942540b\",\"$typeOfContent\":\"\",\"type\":\"ForwardToDesk\",\"conditions\":[],\"settings\":{},\"$invalid\":false}],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"desk:ca5bf9b1-ac9e-4f87-822f-e6bc83e076fe\",\"$invalid\":false},\"$tags\":[],\"id\":\"desk:ca5bf9b1-ac9e-4f87-822f-e6bc83e076fe\",\"deskStateVersion\":\"3.0.0\",\"root\":false,\"$title\":\"Customer service\",\"$afterStateChangedActions\":[{\"$id\":\"6c2f43b9-85c3-4ae3-8db8-d62f4def243e\",\"$typeOfContent\":\"\",\"type\":\"LeavingFromDesk\",\"conditions\":[],\"settings\":{}}],\"$position\":{\"top\":\"195px\",\"left\":\"140px\"},\"$invalidContentActions\":false,\"$invalidOutputs\":false,\"$invalidCustomActions\":false,\"$invalid\":false}},\"globalActions\":{\"$contentActions\":[],\"$conditionOutputs\":[],\"$enteringCustomActions\":[],\"$leavingCustomActions\":[],\"$inputSuggestions\":[],\"$defaultOutput\":{\"stateId\":\"fallback\"},\"$tags\":[],\"id\":\"global-actions\"}}"
                },
                {
                    "role": "user",
                    "content": inputText
                }
            ],
            "temperature": 0.8,
            "max_tokens": 3000,
            "presence_penalty": 0,
            "frequency_penalty": 0,
            "top_p": 0.95,
            "logit_bias": {
              
            },
            "user": "TimeHackAi"
        };
  
        const requestConfig = {  
            headers: {  
                'Content-Type': 'application/json',
                'hack-ai-team-name': 'yorkshires',
                'hack-ai-api-key': apiKey
            }  
        };

        axios.post(apiUrl, requestData, requestConfig)  
            .then(response => {
                const output = response.data.choices[0].message.content;  
                setOutputText(output);
                console.log(output);
            })  
            .catch(error => {
                setOutputText(error);
                console.error(error);
            });
    };

    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <Header
                title={t('title.homePage')}
                icon={PAGE_ICON}
                onClick={() => window.open(settings.repositoryUrl, BLANK)}
            />
            <div className="flex flex-column items-center justify-center bp-c-neutral-dark-city f5 h-100 mt4">
                <textarea 
                    style={{ width: 500, height: 200}} 
                    placeholder={placeholder}
                    onChange={handleInputChange}
                />
                <br />
                <Button 
                    text="Gerar chatbot"
                    variant="primary"
                    onClick={onSubmit}
                />
                <div>
                    <p><strong>Output Text:</strong></p>
                    <p>{outputText}</p>
                </div>
                <h5 className="f5 b mt3 mb2">{t('title.exemples')}</h5>
                <span
                    className="f6 flex items-center blue no-underline underline-hover pointer"
                    data-testid="exemple-one"
                    aria-hidden="true"
                    onClick={() =>
                        handleNavigation(RoutesPath.EXAMPLE_PAGE.PATH, {
                            type: 'storedData'
                        })
                    }
                >
                    <bds-icon name="file-txt-1" size="x-small" />
                    {t('link.blipDataExample')}
                </span>
                <span
                    className="f6 flex items-center blue no-underline underline-hover mt1 pointer"
                    data-testid="exemple-two"
                    aria-hidden="true"
                    onClick={() =>
                        handleNavigation(RoutesPath.EXAMPLE_PAGE.PATH, {
                            type: 'swrCall'
                        })
                    }
                >
                    <bds-icon name="file-txt-1" size="x-small" />
                    {t('link.swrExemple')}
                </span>
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
