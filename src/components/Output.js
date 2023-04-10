import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { RegexContext } from '../contexts/RegexContext';

const Output = ({ t }) => {
  const { output, outPutRef, playAudio } = useContext(RegexContext);

  const generateVariations = (() => {
    const cache = {};

    return (word) => {
      if (cache[word]) {
        return cache[word];
      }

      const variations = [];

      // Find all groups of letters in parentheses
      const groups = word.match(/\(([^)]+)\)/g) || [];

      // Create an array of arrays, where each subarray contains the letters in a group
      const letterArrays = groups.map(group => group.slice(1, -1).split(''));

      // If a group has only one letter, remove the parentheses and add the letter to the list of groups
      const modifiedGroups = groups.reduce((acc, group) => {
        if (group.length === 3) {
          acc.push(group[1]);
        } else {
          acc.push(group);
        }
        return acc;
      }, []);

      // Generate all possible combinations of letters from each group
      const combinations = cartesianProduct(...letterArrays);

      // Generate variations by replacing each group with each combination of letters from that group
      for (const combination of combinations) {
        let newWord = word;
        for (let i = 0; i < modifiedGroups.length; i++) {
          const group = modifiedGroups[i];
          if (group.length === 1) {
            newWord = newWord.replace(`(${group})`, group);
          } else {
            newWord = newWord.replace(groups[i], combination[i]);
          }
        }
        variations.push(newWord);
      }

      cache[word] = variations;
      return variations;
    };
  })();

  function cartesianProduct(...arrays) {
    let result = [[]];
    for (const array of arrays) {
      const newResult = [];
      for (const x of result) {
        for (const y of array) {
          newResult.push([...x, y]);
        }
      }
      result = newResult;
    }
    return result;
  }

  const openRegex101 = (regex, word) => {
    const variations = generateVariations(word);
    const testString = variations.join('\n\n');
    const query = `regex=${encodeURIComponent(regex)}&flavor=golang&testString=${encodeURIComponent(testString)}`;
    const url = `https://regex101.com/?${query}`;
    window.open(url, '_blank');
  };


  return (
    <div>
      <div className="container output_box hide" ref={outPutRef}>
        <div className="text-output">
          <h1>{t('regex-ausgabe')}</h1>
          {output.length && (
            output.map((res, index) => (
              <div id="regex-output" key={index}>
                <div id="result">
                  <p id="word">{res.word}</p>
                  <p id="regex">
                    {res.extra}
                    {res.regex}
                  </p>
                  <button
                    type="button"
                    className="btn me-3"
                    onClick={() => {
                      playAudio();
                      openRegex101(res.regex, res.word);
                    }}
                  >
                    {t('regex-tester')}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      playAudio();
                      navigator.clipboard.writeText(`${res.extra}${res.regex}`);
                      toast.success(t('alert-kopieren'));
                    }}
                  >
                    {t('kopieren')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Output;
