import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { IframeMessageProxy } from 'iframe-message-proxy';
import RoutesPath from '../../constants/routes-path';
import IMPContainer from '../../constants/iframe-message-proxy-container';

import settings from '../../config';

import Header from './components/Header';
import Button from '../../components/Button';

import * as examples from './JsonExamples';
  

const PAGE_ICON = 'plugin';
const BLANK = '_blank';
const placeholder = 'Um chatbot que mostre uma FAQ com perguntas sobre carros';


const exampleJson = examples.pizzaByGpt;

const systemMessage = `Você é um assistente de IA que cria chatbots. Deve conter no mínimo os blocos onboarding, welcome e fallback. Cada ID deve ser um GUID único. Responda apenas com um JSON válido, conforme o exemplo: ${JSON.stringify(exampleJson)}`;
const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
    const [inputText, setInputText] = useState(placeholder);
    const [statusElement, setStatusElement] = useState(<span>Aguardando descrição.</span>);
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

    const saveConfigurations = async () => {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                command: {
                    method: IMPContainer.CommandMethods.SET,
                    uri: '/buckets/blip_portal:builder_working_configuration',
                    type: "application/json",
                    resource: {
                        "builder:minimumIntentScore":"0.5",
                        "builder:stateTrack":"false",
                        "builder:#localTimeZone":"E.South America Standard Time"
                    }
                }
            }
        });
        return response;
    };

    const saveGlobalConfigurations = async () => {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                command: {
                    method: IMPContainer.CommandMethods.SET,
                    uri: '/buckets/blip_portal:builder_working_global_actions',
                    type: "application/json",
                    resource: {
                        "$contentActions":[
                        ],
                        "$conditionOutputs":[
                        ],
                        "$enteringCustomActions":[
                        ],
                        "$leavingCustomActions":[
                        ],
                        "$inputSuggestions":[
                        ],
                        "$defaultOutput":{
                            "stateId":"fallback"
                        },
                        "$tags":[
                        ],
                        "id":"global-actions"
                    }
                }
            }
        });
    
        return response;
    };

    const saveFlow = async (json) => {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPContainer.Actions.SEND_COMMAND,
            content: {
                command: {
                    method: IMPContainer.CommandMethods.SET,
                    uri: '/buckets/blip_portal:builder_working_flow',
                    type: "application/json",
                    resource: json
                }
            }
        });

        return response;
    };

    const onSubmit = async () => {
        const apiUrl = 'https://secure-backend-api.stilingue.com.br/blip-nlu-hack-ai/prod/hack-ai/chat/completions';
  
        const requestData = {
            "deployment": "gpt-35-turbo", // gpt-4-32k gpt-35-turbo
            "messages": [
                {
                    "role": "system",
                    "content": systemMessage
                },
                {
                    "role": "user",
                    "content": inputText
                }
            ],
            "temperature": 0.7,
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

        setStatusElement(
            <bds-grid container>
                Gerando o bot... 
                <bds-loading-spinner size="extra-small" color="main" />
            </bds-grid>
        );

        axios.post(apiUrl, requestData, requestConfig)  
            .then(response => {
                setStatusElement(
                    <bds-grid container>
                        Validando o JSON... 
                        <bds-loading-spinner size="extra-small" color="main" />
                    </bds-grid>);
                const output = response.data.choices[0].message.content;
                setOutputText(output);
                console.log(output);
                console.log(JSON.parse(output));
                return JSON.parse(output);
            }).then(json => {
                setStatusElement(
                    <bds-grid container>
                        Atualizando o builder... 
                        <bds-loading-spinner size="extra-small" color="main" />
                    </bds-grid>);
                return saveFlow(json);
            }).then( () => {
                setStatusElement(
                    <bds-grid container>
                        Atualizando as configs...
                        <bds-loading-spinner size="extra-small" color="main" />
                    </bds-grid>);
                saveConfigurations();
            }).then( () => {
                setStatusElement(
                    <bds-grid container>
                        Atualizando as configs globais...
                        <bds-loading-spinner size="extra-small" color="main" />
                    </bds-grid>);
                saveGlobalConfigurations();
            }).then(r => {
                setStatusElement(
                    <bds-grid container>
                        Finalizado.
                        <bds-icon name="check" />
                    </bds-grid>);
                console.log(r);
            })
            .catch(error => {
                setStatusElement(
                    <bds-grid container>
                        {`Houve um erro: ${error}`}
                        <bds-icon name="error" />
                    </bds-grid>);
                setOutputText("");
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
                    <p><strong>Status:</strong></p>
                    <p>{statusElement}</p>
                </div>
                <div>
                    <p><strong>JSON do bot:</strong></p>
                    <p>{outputText}</p>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
