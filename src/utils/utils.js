export const hideWords = (word, sentence, alt = "_") => {
    let regex = new RegExp("(" + word + ")", "gi");
    return sentence.replace(regex, (m) =>
        Array(m.length).join(alt)
    );
}