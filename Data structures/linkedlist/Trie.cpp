#include<bits/stdc++.h>
using namespace std;

struct Trie{
    bool endmark;
    Trie *next[27];
    Trie()
    {
        endmark=false;
        for(int i=0;i<26;i++)
        {
            next[i]=NULL;
        }
    }
};
Trie *root = new Trie();
void add(string s)
{
    Trie *cur =root;
    for(int i=0;i<s.size();i++)
    {
        int ch=s[i]-'a';
        if(cur->next[ch]==NULL)
        {
            cur->next[ch]=new Trie();
        }
        cur=cur->next[ch];
    }
    cur->endmark=true;
}

bool Search(string s)
{
    Trie *cur = root;
    for(int i=0;i<s.size();i++)
    {
        int ch=s[i]-'a';
        if(cur->next[ch]==NULL)
            return false;
        cur=cur->next[ch];
    }
    return cur->endmark;
}

int main()
{

    add("abu");
    add("abbu");
    add("obu");
    if(Search("abddu"))
        cout<<"abu is found"<<endl;
    else
        cout<<"Not found"<<endl;
    return 0;
}
