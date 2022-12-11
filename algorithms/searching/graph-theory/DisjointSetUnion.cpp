#include<bits/stdc++.h>

#define     ll      long long
#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
inline int nxt(){int aaa;scanf("%d",&aaa);return aaa;}
inline ll lxt(){ll aaa;scanf("%lld",&aaa);return aaa;}
#ifdef ARnAb
     #define debug(...) __f(#__VA_ARGS__, __VA_ARGS__)
    template < typename Arg1 >
    void __f(const char* name, Arg1&& arg1){
        cerr << name << " is " << arg1 << std::endl;
    }
    template < typename Arg1, typename... Args>
    void __f(const char* names, Arg1&& arg1, Args&&... args){
        const char* comma = strchr(names+1, ',');
        cerr.write(names, comma - names) << " is " << arg1 <<"  ";
        __f(comma+1, args...);
    }
#else
    #define debug(...)
#endif
///******************************************START******************************************
int cs=0;
int par[100005];
void DSU()
{
    for(int i=1;i<=100;i++)
    {
        par[i]=i;
    }

}
void mergeSet(int x, int y){
    par[y]=x;
}
int findUnion(int x)
{
    if(par[x]==x)   return x;
    return findUnion(par[x]);
}
void solve()
{
    DSU();
    for(int i=0;i<10;i++){
        int u=nxt(),v=nxt();
        if(findUnion(u)!=findUnion(v)){
            mergeSet(u,v);
        }else cout<<"ho ek tor ki?"<<endl;
    }
}
int main()
{
    Fast_Read
    Precision(2)
    #ifdef ARnAb
        double start_time = clock();
        ///freopen ("output.txt","w",stdout);
        ///freopen ("input.txt","r",stdin);
    #endif
    int tc=1;
    while(tc--)
        solve();
    return 0;
}
