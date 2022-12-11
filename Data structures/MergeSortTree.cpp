#include<bits/stdc++.h>

#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     inf     INT_MAX/2;
#define     INF     LLONG_MAX/2;
#define     mset(a,x)                    memset(a,(x),sizeof(a))
#define     all(x)                       x.begin(),x.end()
#define     allr(x)                      x.rbegin(),x.rend()
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vii;
typedef vector<ll> vll;
template < class T> inline T biton(T n,T pos){return n  ((T)1<<pos);}
template < class T> inline T bitoff(T n,T pos){return n & ~((T)1<<pos);}
template < class T> inline T ison(T n,T pos){return (bool)(n & ((T)1<<pos));}
template < class T> inline T gcd(T a, T b){while(b){a%=b;swap(a,b);}return a;}
inline int nxt(){int aaa;scanf("%d",&aaa);return aaa;}
inline ll lxt(){ll aaa;scanf("%lld",&aaa);return aaa;}
inline double dxt(){double aaa;scanf("%lf",&aaa);return aaa;}
template < class T> inline void vinput(T n,vector<T> &v){ for(T in,i=0;i<n;i++){cin>>in; v.push_back(in);} }
template < class T> inline void vout(vector<T> v){ for(auto it:v) cout<<it<<" "; cout<<endl; }
const ll M = 1e9+7;
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
vector< vector<int> > Tree;
vector< int > next_right;
void build_Tree(ll node,ll s,ll e)
{
    if(s==e)
    {
        Tree[node].pb(next_right[s]);
        return;
    }
    ll mid = (s+e)>>1 ;
    ll left = node<<1;
    ll right = left|1 ;
;
    build_Tree(left,s,mid);
    build_Tree(right,mid+1,e);
    Tree[node].resize(Tree[left].size()+Tree[right].size());
    merge(Tree[left].begin(),Tree[left].end(),Tree[right].begin(),Tree[right].end(),Tree[node].begin());

}
ll Query(ll node,ll s,ll e,ll l,ll r,ll val)
{
    if(l>e || r<s)  return 0;
    if(s>=l && e<=r)
    {
        return (ll)(Tree[node].end() - upper_bound(Tree[node].begin(),Tree[node].end(),val));
    }
    ll mid = (s+e)>>1 ;
    ll left = node<<1;
    ll right = left|1 ;
    ll xx = Query(left,s,mid,l,r,val);
    ll yy =Query(right,mid+1,e,l,r,val);
    return xx+yy;

}
void solve()
{
    int n,k;
    cin>>n>>k;
    Tree.assign(4*n,vector<int>());
    vector<int> lastIndex(100010,-1);
    next_right.assign(n+5,n+1);
    for(int i=1;i<=n;i++)
    {
        int in;
        cin>>in;
        if(lastIndex[in]!=-1)
            next_right[lastIndex[in]]=i;
        lastIndex[in]=i;
    }
    ///vout(next_right);
    build_Tree(1,1,n);
    cout<<"Case "<<++cs<<":"<<endl;
    while(k--)
    {
        int l,r;
        cin>>l>>r;
        cout<<Query(1,1,n,l,r,r)<<endl;
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
    cin>>tc;
    while(tc--)
        solve();
    return 0;
}
