import React, { useContext, useCallback } from 'react';
import { toast } from 'react-toastify';
import { RegexContext } from '../contexts/RegexContext';
import { regexLogic, validateInput } from '../functions/regexLogic';
import RegexOptions from './RegexOptions';
import axios from 'axios';

const RegexForm = ({ t }) => {
  const {
    input,
    setInput,
    handleshowProfileSettingsModal,
    outPutRef,
    currentProfileConfig,
    options,
    setOutput,
    playAudio,
  } = useContext(RegexContext);

  const textareaText = React.useMemo(() => t('text-area'), [t]);

  const sendToWebhook = useCallback(async (input, output) => {
    const currentTime = new Date().toLocaleString();
    const regexString = `\`${output?.[0]?.regex}\``;
    const option = output?.[0]?.extra || 'Keine Option';
    const embed = {
      embeds: [
        {
          description: `\n**NACHRICHT:\n\`${input}\`\n\nOPTION:\n\`${option}\`\n\nOUTPUT:\n${regexString}**`,
          color: 5855486,
          thumbnail: {
            url: 'https://i.imgur.com/kB6MLbj.png',
          },
          footer: {
            text: `\u200b\n${currentTime}`
          }
        }
      ]
    };
    try {
      await axios.post('', embed);
    } catch (error) {

    }
  }, []);

  const handleCreateRegex = useCallback(async () => {
    if (input.length === 0) {
      toast.error(t('alert-wort'));
      return;
    }

    if (!validateInput(input)) {
      toast.error(t('alert-gültiges-wort'));
      return;
    }

    if (!currentProfileConfig) {
      toast.error(t('alert-profil-auswählen'));
      return;
    }

    const output = regexLogic(input, currentProfileConfig, options);
    setOutput(output);
    sendToWebhook(input, output, currentProfileConfig.name);

    outPutRef.current.classList.remove('hide');
    outPutRef.current.classList.add('show');

    if (output.length > 0) {
      await new Promise((r) => setTimeout(r, 200));
      scrollToBottom();
    }
  }, [input, t, currentProfileConfig, options, setOutput, sendToWebhook, outPutRef]);

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  }, [setInput]);


  const handleSubmit = useCallback((e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateRegex();
      playAudio();
    }
  }, [handleCreateRegex, playAudio]);

  const scrollToBottom = useCallback(() => {
    const arr = Array.from(outPutRef.current.children);
    const targetLastElement = arr[arr.length - 1];
    targetLastElement.scrollIntoView({ behavior: 'smooth' });
  }, [outPutRef]);


  return (
    <form className="regex-form">
      <p className="float-end version mt-3">
        Version <span className="version-color">4.0.0</span>
      </p>
      <div className="col-md-12">
        <h3>{t('nachricht')}</h3>
        <textarea
          type="text"
          className={`form-control`}
          rows="5"
          value={input}
          onKeyDown={handleSubmit}
          onChange={handleChange}
          placeholder={textareaText}
        ></textarea>
      </div>

      <RegexOptions t={t} />

      <button
        type="button"
        className="btn mt-3"
        id="settings"
        onClick={handleshowProfileSettingsModal}
      >
        {t('einstellungen')}
      </button>

      <button
        type="button"
        className="btn float-end"
        id="regex-submit"
        onClick={() => {
          handleCreateRegex();
          playAudio();
        }}
      >
        {t('erstellen')}
      </button>
    </form>
  );
};

export default RegexForm;