using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Highscore : MonoBehaviour {

    public string host = "http://18.184.77.226:3000/";
    public int page;
    public int limit;
    public int sorting;

    public string gameId;

    public HighScores scores;

    void Start()
    {
        
    }

    public void UpdateList()
    {
        StartCoroutine(GetList());
    }

    IEnumerator GetList()
    {
        UnityWebRequest www = UnityWebRequest.Get(host+"list/"+gameId+"/"+sorting+"/"+limit+"/"+page);

        www.chunkedTransfer = false;
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // Show results as text
            Debug.Log(www.downloadHandler.text);
            scores = JsonUtility.FromJson<HighScores>(www.downloadHandler.text);
            
        }
    }

    public void Submit(string name, int score)
    {
        StartCoroutine(SubmitScore(name,score));
    }

    public void TestSubmit()
    {
        Submit("testi", (int)Mathf.Floor(UnityEngine.Random.Range(0, 200)));
    }

    IEnumerator SubmitScore(string name, int score)
    {
        var s = new ScorePost();
        s.score = score;
        s.user = name;
        s.game = gameId;
        Debug.Log(JsonUtility.ToJson(s));
        UnityWebRequest www = UnityWebRequest.Put(host + "submit/", JsonUtility.ToJson(s));
        www.SetRequestHeader("Content-Type","application/json");
        www.method = "POST";
        yield return www.SendWebRequest();

        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Form upload complete!");
        }
    }
    
}

